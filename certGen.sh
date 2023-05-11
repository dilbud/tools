#!/bin/bash
# EOF if windows to linux or if linux to windows

## gen key pair
openssl req -newkey rsa:2048 -nodes -keyout certificate.key -x509 -out certificate.pem -subj '/CN=Test Certificate' -addext "subjectAltName = DNS:localhost"

## digest
openssl x509 -pubkey -noout -in certificate.pem | openssl rsa -pubin -outform der | openssl dgst -sha256 -binary | base64

## in chrome create short cut with
--test-type --origin-to-force-quic-on=localhost:4433 --ignore-certificate-errors-spki-list=KEiK6E94jMJCYb3fiw5FhmbEMDbY8z5/aMUpUvQju2I=