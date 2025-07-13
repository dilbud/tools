## create CA key
openssl ecparam -out ca.key -name prime256v1 -genkey

## create ca CSR 
openssl req -new -sha256 -key ca.key -out ca.csr

## create self sign ca certificate
openssl x509 -req -sha256 -days 365 -in ca.csr -signkey ca.key -out ca.crt

## create server key
openssl genrsa -out server.key 2048
openssl ecparam -name prime256v1 -genkey -noout -out server.key

##################################################### interactive mode
## create server CSR
openssl req -new -key server.key -out server.csr -sha256
#####################################################
##################################################### non interactive mode
### server.cnf
[ req ]
prompt             = no
default_bits       = 2048        # only used for RSA
default_md         = sha256
distinguished_name = dn

[ dn ]
C  = US
ST = California
L  = San Francisco
O  = MyOrg Ltd
OU = IT
CN = server.example.com

## create server CSR
openssl req -new -key server.key -out server.csr -config server.cnf
#####################################################

## sign server CSR with root CA
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365 -sha256

## verify with CA
openssl verify -CAfile ca.crt server.crt

## create keystore
openssl pkcs12 -export -inkey server.key -in server.crt -certfile ../CA/ca.crt -out server-keystore.p12 -name artemis -password pass:rootroot
keytool -importkeystore -deststorepass rootroot -destkeypass rootroot -destkeystore server-keystore.jks -deststoretype JKS -srckeystore server-keystore.p12 -srcstoretype PKCS12 -srcstorepass rootroot -alias artemis

## verify keystore
keytool -list -v -keystore server-keystore.jks -storepass rootroot
keytool -list -v -keystore server-keystore.p12 -storepass rootroot

## create truststore
keytool -importcert -alias artemis -file ../CA/ca.crt -keystore client-truststore.jks -storepass rootroot -storetype JKS
keytool -importcert -alias artemis -file ../CA/ca.crt -keystore client-truststore.p12 -storepass rootroot -storetype PKCS12

## verify truststore
keytool -list -keystore client-truststore.jks -storepass rootroot -v
