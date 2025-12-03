---
created: 1970-01-01T01:00
updated: 2025-11-16T12:46
source: https://www.youtube.com/watch?v=3tKA4zxqZVI
---
# Keycloak

#### Client settings

![[Pasted image 20251116124435.png]]

+ Client ID: ID of client
+ Valid redirect URIs: your frontend App
+ Web origins: your frontend App
+ Standard flow & Direct access grants
+ PKCE Method: S256

![[Pasted image 20251116110612.png]]
#### OpenID Endpoint Configuration

![[Pasted image 20251116110644.png]]

# PKCE - Flow

![[Bildschirmfoto vom 2025-11-16 10-58-31.png]]

# Postman

![[Pasted image 20251116112007.png]]

+ Here you need to set up the auth by adding the client and paths and then get the access token.
+ After that you should be able to do requests to the java backend and get results back

# JWT.io

![[Pasted image 20251116112311.png]]
+ Here you can check the contents of the jwt and what fields you can read out.