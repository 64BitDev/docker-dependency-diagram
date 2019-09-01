import os
import socket
import fcntl
import struct
import logging
from scapy.all import IP
from scapy.all import sniff
from scapy.layers import http
from snifferGraph import push_connection

def get_ip_address(ifname):
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    return socket.inet_ntoa(fcntl.ioctl(
        s.fileno(),
        0x8915,  # SIOCGIFADDR
        struct.pack('256s', ifname[:15])
    )[20:24])


network_hardware='eth0'
host_ip = get_ip_address(network_hardware)
host_name = os.environ['host']

# Extracting all URLS

def sniff_urls(packet):
    if packet.haslayer(http.HTTPRequest):
        http_layer = packet.getlayer(http.HTTPRequest)
        ip_layer = packet.getlayer(IP)
        if host_ip != ip_layer.fields['src'] or http_layer.fields['Host'] == 'neo4j':
            logging.warn('\n ingress')
        else:
            message = '\n{0[src]} - {1[Method]} - http://{1[Host]}{1[Path]}'.format(ip_layer.fields, http_layer.fields)
            logging.warn(message)
            push_connection(host_name,
                            destination=http_layer.fields['Host'],
                            method=http_layer.fields['Method'])


# Start sniffing the network.
sniff(filter='tcp', prn=sniff_urls, iface=network_hardware)
