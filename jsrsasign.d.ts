// Type definitions for jsrsasign v8.0.6
// Project: https://github.com/kjur/jsrsasign
// Definitions by: Florian Keller <https://github.com/ffflorian>

interface RSAPublicKey {
  n_hex: string;
  e_hex: string;
}

declare class BigInteger {
  static readonly ZERO: BigInteger;
  static readonly ONE: BigInteger;

  abs(): BigInteger;
  bitLength(): number;
  compareTo(a: BigInteger): number;
  mod(a: BigInteger): BigInteger;
  modPowInt(e: number, m: BigInteger): BigInteger;
  negate(): BigInteger;
  toString(b: number): string;
}

/** Tom Wu's RSA Key class and extension */
declare class RSAKey {
    constructor();
    /**
     * static method to get array of hex field values from hexadecimal PKCS#5 RSA private key.
     * @param sPEMPrivateKey PEM PKCS#1/5 s private key string
     * @return array of field hex value
     * @example
     * RSAKey.getHexValueArrayOfChildrenFromHex("3082...") → ["00", "3b42...", ...]
     */
    static getHexValueArrayOfChildrenFromHex(sPEMPrivateKey: string): Array<any>;

    /**
     * static method to get array of field positions from hexadecimal PKCS#5 RSA private key.
     * @param sPEMPrivateKey PEM PKCS#1/5 s private key string
     * @return array of field positions
     * @example
     * RSAKey.getPosArrayOfChildrenFromHex("3082...") → [8, 32, ...]
     */
    static getPosArrayOfChildrenFromHex(sPEMPrivateKey: string): Array<any>;

    /**
     * read an ASN.1 hexadecimal string of X.509 RSA public key certificate
     * @param h hexadecimal string of X.509 RSA public key certificate
     * @param nthPKI nth index of publicKeyInfo. (DEFAULT: 6 for X509v3)
     */
    readCertPubKeyHex(h: string, nthPKI: number): void;

    /**
     * read an ASN.1 hexadecimal string of PKCS#1/5 plain RSA private key
     * @param h hexadecimal string of PKCS#1/5 plain RSA private key
     */
    readPKCS5PrvKeyHex(h: string): void;

    /**
     * read an ASN.1 hexadecimal string of PKCS#5 RSA public key
     * @param h hexadecimal string of PKCS#5 public key
     */
    readPKCS5PubKeyHex(h: string): void;

    /**
     * read an ASN.1 hexadecimal string of PKCS#8 plain RSA private key
     * @param h hexadecimal string of PKCS#8 plain RSA private key
     */
    readPKCS8PrvKeyHex(h: string): void;

    /**
     * read an ASN.1 hexadecimal string of PKCS#8 RSA public key
     * @param h hexadecimal string of PKCS#8 public key
     */
    readPKCS8PubKeyHex(h: string): void;

    /**
     * read PKCS#1 private key from a string
     * @param keyPEM string of PKCS#1 private key.
     */
    readPrivateKeyFromPEMString(keyPEM: string): void;

    /**
     * sign for a message string with RSA private key.
     * @param s message string to be signed.
     * @param hashAlg hash algorithm name for signing.
     * @return returns hexadecimal string of signature value.
     */
    static sign(s: string, hashAlg: string): string;

    /**
     * sign for a message string with RSA private key by PKCS#1 PSS signing.
     * @param s message string to be signed.
     * @param hashAlg hash algorithm name for signing.
     * @param sLen salt byte length from 0 to (keybytelen - hashbytelen - 2).
     *        There are two special values:
     *        * -1: sets the salt length to the digest length
     *        * -2: sets the salt length to maximum permissible value
     *           (i.e. keybytelen - hashbytelen - 2)
     *
     *        DEFAULT is -1. (NOTE: OpenSSL's default is -2.)
     * @return returns hexadecimal string of signature value.
     */
    static signPSS(s: string, hashAlg: string, sLen: number): string;

    /**
     * sign hash value of message to be signed with RSA private key.
     * @param sHashHex hexadecimal string of hash value of message to be signed.
     * @param hashAlg hash algorithm name for signing.
     * @return returns hexadecimal string of signature value.
     */
    static signWithMessageHash(sHashHex: string, hashAlg: string): any;

    /**
     * sign hash value of message with RSA private key by PKCS#1 PSS signing.
     * @param hHash hexadecimal hash value of message to be signed.
     * @param hashAlg hash algorithm name for signing.
     * @param sLen salt byte length from 0 to (keybytelen - hashbytelen - 2).
     *        There are two special values:
     *        * -1: sets the salt length to the digest length
     *        * -2: sets the salt length to maximum permissible value
     *           (i.e. keybytelen - hashbytelen - 2)
     *
     *        DEFAULT is -1. (NOTE: OpenSSL's default is -2.)
     * @return returns hexadecimal string of signature value.
     */
    static signWithMessageHashPSS(hHash, hashAlg, sLen): any;

    /**
     * verifies a sigature for a message string with RSA public key.
     * @param sMsg message string to be verified.
     * @param hSig hexadecimal string of siganture.
     *                 non-hexadecimal charactors including new lines will be ignored.
     * @return returns 1 if valid, otherwise 0
     */
    verify(sMsg, hSig): any;

    /**
     * verifies a sigature for a message string with RSA public key by PKCS#1 PSS sign.
     * @param sMsg message string to be verified.
     * @param hSig hexadecimal string of signature value
     * @param hashAlg hash algorithm name
     * @param sLen salt byte length from 0 to (keybytelen - hashbytelen - 2).
     *        There are two special values:
     *        * -1: sets the salt length to the digest length
     *        <li>-2: sets the salt length to maximum permissible value
     *           (i.e. keybytelen - hashbytelen - 2)</li>
     *
     *        DEFAULT is -1. (NOTE: OpenSSL's default is -2.)
     * @return returns true if valid, otherwise false
     */
    static verifyPSS(sMsg, hSig, hashAlg, sLen): any;

    /**
     * verifies a sigature for a message string with RSA public key.
     * @param sHashHex hexadecimal hash value of message to be verified.
     * @param hSig hexadecimal string of siganture.
     *                 non-hexadecimal charactors including new lines will be ignored.
     * @return returns 1 if valid, otherwise 0
     */
    static verifyWithMessageHash(sHashHex, hSig): any;

    /**
     * verifies a sigature for a hash value of message string with RSA public key by PKCS#1 PSS sign.
     * @param hHash hexadecimal hash value of message string to be verified.
     * @param hSig hexadecimal string of signature value
     * @param hashAlg hash algorithm name
     * @param sLen salt byte length from 0 to (keybytelen - hashbytelen - 2).
     *        There are two special values:
     *        * -1: sets the salt length to the digest length
     *        <li>-2: sets the salt length to maximum permissible value
     *           (i.e. keybytelen - hashbytelen - 2)</li>
     *
     *        DEFAULT is -1 (NOTE: OpenSSL's default is -2.)
     * @return returns true if valid, otherwise false
     */
    static verifyWithMessageHashPSS(hHash, hSig, hashAlg, sLen): any;

}

declare class X509 {
  hex: string;
  static readonly version: string;

  constructor();

  /**
   * get format version (X.509v1 or v3 certificate)<br/>
   * @return 1 for X509v1, 3 for X509v3, otherwise 0
   * @description
   * This method returns a format version of X.509 certificate.
   * It returns 1 for X.509v1 certificate and 3 for v3 certificate.
   * Otherwise returns 0.
   * This method will be automatically called in
   * {@link X509#readCertPEM}. After then, you can use
   * {@link X509.version} parameter.
   * @example
   * var x = new X509();
   * x.readCertPEM(sCertPEM);
   * version = x.getVersion();    // 1 or 3
   * sn = x.getSerialNumberHex(); // return string like "01ad..."
   */
  getVersion(): number;

  /**
   * get hexadecimal string of serialNumber field of certificate.<br/>
   * @return hexadecimal string of certificate serial number
   * @example
   * var x = new X509();
   * x.readCertPEM(sCertPEM);
   * var sn = x.getSerialNumberHex(); // return string like "01ad..."
   */
  getSerialNumberHex(): string;

  /**
   * get signature algorithm name in basic field
   * @return signature algorithm name (ex. SHA1withRSA, SHA256withECDSA)
   * @description
   * This method will get a name of signature algorithm field of certificate:
   * @example
   * var x = new X509();
   * x.readCertPEM(sCertPEM);
   * algName = x.getSignatureAlgorithmField();
   */
  getSignatureAlgorithmField(): string;

  /**
   * get hexadecimal string of issuer field TLV of certificate.<br/>
   * @return hexadecial string of issuer DN ASN.1
   * @example
   * var x = new X509();
   * x.readCertPEM(sCertPEM);
   * var issuer = x.getIssuerHex(); // return string like "3013..."
   */
  getIssuerHex(): string;

  /**
   * get string of issuer field of certificate.<br/>
   * @return issuer DN string
   * @example
   * var x = new X509();
   * x.readCertPEM(sCertPEM);
   * var issuer = x.getIssuerString(); // return string like "/C=US/O=TEST"
   */
  getIssuerString(): string;

  /**
   * get hexadecimal string of subject field of certificate.<br/>
   * @return hexadecial string of subject DN ASN.1
   * @example
   * var x = new X509();
   * x.readCertPEM(sCertPEM);
   * var subject = x.getSubjectHex(); // return string like "3013..."
   */
  getSubjectHex(): string;

  /**
   * get string of subject field of certificate.<br/>
   * @return subject DN string
   * @example
   * var x = new X509();
   * x.readCertPEM(sCertPEM);
   * var subject = x.getSubjectString(); // return string like "/C=US/O=TEST"
   */
  getSubjectString(): string;

  /**
   * get notBefore field string of certificate.<br/>
   * @return not before time value (ex. "151231235959Z")
   * @example
   * var x = new X509();
   * x.readCertPEM(sCertPEM);
   * var notBefore = x.getNotBefore(); // return string like "151231235959Z"
   */
  getNotBefore(): string;

  /**
   * get notAfter field string of certificate.<br/>
   * @return not after time value (ex. "151231235959Z")
   * @example
   * var x = new X509();
   * x.readCertPEM(sCertPEM);
   * var notAfter = x.getNotAfter(); // return string like "151231235959Z"
   */
  getNotAfter(): string;

  /**
   * get a hexadecimal string of subjectPublicKeyInfo field.<br/>
   * @return ASN.1 SEQUENCE hexadecimal string of subjectPublicKeyInfo field
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM);
   * hSPKI = x.getPublicKeyHex(); // return string like "30820122..."
   */
  getPublicKeyHex(): string;

  /**
   * get a string index of subjectPublicKeyInfo field for hexadecimal string certificate.<br/>
   * @return string index of subjectPublicKeyInfo field for hexadecimal string certificate.
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM);
   * idx = x.getPublicKeyIdx(); // return string index in x.hex parameter
   */
  getPublicKeyIdx(): number;

  /**
   * get a string index of contents of subjectPublicKeyInfo BITSTRING value from hexadecimal certificate<br/>
   * @return string index of key contents
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM);
   * idx = x.getPublicKeyContentIdx(); // return string index in x.hex parameter
   */
  // NOTE: Without BITSTRING encapsulation.
  getPublicKeyContentIdx(): number;

  /**
   * get a RSAKey/ECDSA/DSA public key object of subjectPublicKeyInfo field.<br/>
   * @return RSAKey/ECDSA/DSA public key object of subjectPublicKeyInfo field
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM);
   * pubkey= x.getPublicKey();
   */
  getPublicKey(): PublicKey;

  /**
   * get signature algorithm name from hexadecimal certificate data
   * @param hCert hexadecimal string of X.509 certificate binary
   * @return signature algorithm name (ex. SHA1withRSA, SHA256withECDSA)
   * @description
   * This method will get signature algorithm name of certificate:
   * @example
   * var x = new X509();
   * x.readCertPEM(sCertPEM);
   * x.getSignatureAlgorithmName() &rarr; "SHA256withRSA"
   */
  getSignatureAlgorithmName(): string;

  /**
   * get signature value in hexadecimal string<br/>
   * @return signature value hexadecimal string without BitString unused bits
   * @description
   * This method will get signature value of certificate:
   * @example
   * var x = new X509();
   * x.readCertPEM(sCertPEM);
   * x.getSignatureValueHex() &rarr "8a4c47913..."
   */
  getSignatureValueHex(): string;

  /**
   * verifies signature value by public key<br/>
   * @param pubKey public key object
   * @return true if signature value is valid otherwise false
   * @description
   * This method verifies signature value of hexadecimal string of
   * X.509 certificate by specified public key object.
   * @example
   * pubKey = KEYUTIL.getKey(pemPublicKey); // or certificate
   * x = new X509();
   * x.readCertPEM(pemCert);
   * x.verifySignature(pubKey) &rarr; true, false or raising exception
   */
  verifySignature(pubKey: PublicKey): boolean;

  // ===== parse extension ======================================
  /**
   * set array of X.509v3 extesion information such as extension OID, criticality and value index.<br/>
   * @description
   * This method will set an array of X.509v3 extension information having
   * following parameters:
   * <ul>
   * <li>oid - extension OID (ex. 2.5.29.19)</li>
   * <li>critical - true or false</li>
   * <li>vidx - string index for extension value</li>
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM); // parseExt() will also be called internally.
   *
   * x.aExtInfo &rarr;
   * [ { oid: "2.5.29,19", critical: true, vidx: 2504 }, ... ]
   */
  parseExt(): void;

  /**
   * get a X.509v3 extesion information such as extension OID, criticality and value index for specified oid or name.<br/>
   * @param oidOrName X.509 extension oid or name (ex. keyUsage or 2.5.29.19)
   * @return X.509 extension information such as extension OID or value indx (see {@link X509#parseExt})
   * @description
   * This method will get an X.509v3 extension information JSON object
   * having extension OID, criticality and value idx for specified
   * extension OID or name.
   * If there is no such extension, this returns undefined.
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM); // parseExt() will also be called internally.
   *
   * x.getExtInfo("keyUsage") &rarr; { oid: "2.5.29.15", critical: true, vidx: 1714 }
   * x.getExtInfo("unknownExt") &rarr; undefined
   */
  getExtInfo(oidOrName: string): X509Extension;

  /**
   * get BasicConstraints extension value as object in the certificate
   * @return associative array which may have "cA" and "pathLen" parameters
   * @description
   * This method will get basic constraints extension value as object with following paramters.
   * <ul>
   * <li>cA - CA flag whether CA or not</li>
   * <li>pathLen - maximum intermediate certificate length</li>
   * </ul>
   * There are use cases for return values:
   * <ul>
   * <li>{cA:true, pathLen:3} - cA flag is true and pathLen is 3</li>
   * <li>{cA:true} - cA flag is true and no pathLen</li>
   * <li>{} - basic constraints has no value in case of end entity certificate</li>
   * <li>undefined - there is no basic constraints extension</li>
   * </ul>
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM); // parseExt() will also be called internally.
   * x.getExtBasicConstraints() &rarr; { cA: true, pathLen: 3 };
   */
  getExtBasicConstraints(): AssociativeArray;


  /**
   * get KeyUsage extension value as binary string in the certificate<br/>
   * @return binary string of key usage bits (ex. '101')
   * @description
   * This method will get key usage extension value
   * as binary string such like '101'.
   * Key usage bits definition is in the RFC 5280.
   * If there is no key usage extension in the certificate,
   * it returns empty string (i.e. '').
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM); // parseExt() will also be called internally.
   * x.getExtKeyUsageBin() &rarr; '101'
   * // 1 - digitalSignature
   * // 0 - nonRepudiation
   * // 1 - keyEncipherment
   */
  getExtKeyUsageBin(): string;

  /**
   * get KeyUsage extension value as names in the certificate<br/>
   * @return comma separated string of key usage
   * @description
   * This method will get key usage extension value
   * as comma separated string of usage names.
   * If there is no key usage extension in the certificate,
   * it returns empty string (i.e. '').
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM); // parseExt() will also be called internally.
   * x.getExtKeyUsageString() &rarr; "digitalSignature,keyEncipherment"
   */
  getExtKeyUsageString(): string;

  /**
   * get subjectKeyIdentifier value as hexadecimal string in the certificate<br/>
   * @return hexadecimal string of subject key identifier or null
   * @description
   * This method will get subject key identifier extension value
   * as hexadecimal string.
   * If there is this in the certificate, it returns undefined;
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM); // parseExt() will also be called internally.
   * x.getExtSubjectKeyIdentifier() &rarr; "1b3347ab...";
   */
  getExtSubjectKeyIdentifier(): string;

  /**
   * get authorityKeyIdentifier value as JSON object in the certificate<br/>
   * @return JSON object of authority key identifier or null
   * @description
   * This method will get authority key identifier extension value
   * as JSON object.
   * If there is this in the certificate, it returns undefined;
   * <br>
   * NOTE: Currently this method only supports keyIdentifier so that
   * authorityCertIssuer and authorityCertSerialNumber will not
   * be return in the JSON object.
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM); // parseExt() will also be called internally.
   * x.getExtAuthorityKeyIdentifier() &rarr; { kid: "1234abcd..." }
   */
  getExtAuthorityKeyIdentifier(): AuthorityKey | null;

  /**
   * get extKeyUsage value as array of name string in the certificate<br/>
   * @return array of extended key usage ID name or oid
   * @description
   * This method will get extended key usage extension value
   * as array of name or OID string.
   * If there is this in the certificate, it returns undefined;
   * <br>
   * NOTE: Supported extended key usage ID names are defined in
   * name2oidList parameter in asn1x509.js file.
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM); // parseExt() will also be called internally.
   * x.getExtExtKeyUsageName() &rarr; ["serverAuth", "clientAuth", "0.1.2.3.4.5"]
   */
  getExtExtKeyUsageName(): Array<ExtendedKey.usageId> | Oid

  /**
   * get subjectAltName value as array of string in the certificate
   * @return array of alt name array
   * @description
   * This method will get subject alt name extension value
   * as array of type and name.
   * If there is this in the certificate, it returns undefined;
   * Type of GeneralName will be shown as following:
   * <ul>
   * <li>"MAIL" - [1]rfc822Name</li>
   * <li>"DNS"  - [2]dNSName</li>
   * <li>"DN"   - [4]directoryName</li>
   * <li>"URI"  - [6]uniformResourceIdentifier</li>
   * <li>"IP"   - [7]iPAddress</li>
   * </ul>
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM); // parseExt() will also be called internally.
   * x.getExtSubjectAltName2() &rarr;
   * [["DNS",  "example.com"],
   *  ["DNS",  "example.org"],
   *  ["MAIL", "foo@example.com"],
   *  ["IP",   "192.168.1.1"],
   *  ["DN",   "/C=US/O=TEST1"]]
   */
  getExtSubjectAltName2()

  /**
   * get array of string for fullName URIs in cRLDistributionPoints(CDP) in the certificate
   * @return array of fullName URIs of CDP of the certificate
   * @description
   * This method will get all fullName URIs of cRLDistributionPoints extension
   * in the certificate as array of URI string.
   * If there is this in the certificate, it returns undefined;
   * <br>
   * NOTE: Currently this method supports only fullName URI so that
   * other parameters will not be returned.
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM); // parseExt() will also be called internally.
   * x.getExtCRLDistributionPointsURI() &rarr;
   * ["http://example.com/aaa.crl", "http://example.org/aaa.crl"]
   */
  getExtCRLDistributionPointsURI()

  /**
   * get AuthorityInfoAccess extension value in the certificate as associative array
   * @return associative array of AIA extension properties
   * @description
   * This method will get authority info access value
   * as associate array which has following properties:
   * <ul>
   * <li>ocsp - array of string for OCSP responder URL</li>
   * <li>caissuer - array of string for caIssuer value (i.e. CA certificates URL)</li>
   * </ul>
   * If there is this in the certificate, it returns undefined;
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM); // parseExt() will also be called internally.
   * x.getExtAIAInfo(hCert) &rarr;
   * { ocsp:     ["http://ocsp.foo.com"],
   *   caissuer: ["http://rep.foo.com/aaa.p8m"] }
   */
  getExtAIAInfo()

  /**
   * get CertificatePolicies extension value in the certificate as array
   * @return array of PolicyInformation JSON object
   * @description
   * This method will get certificate policies value
   * as an array of JSON object which has following properties:
   * <ul>
   * <li>id - </li>
   * <li>cps - URI of certification practice statement</li>
   * <li>unotice - string of UserNotice explicitText</li>
   * </ul>
   * If there is this extension in the certificate,
   * it returns undefined;
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM); // parseExt() will also be called internally.
   * x.getExtCertificatePolicies &rarr;
   * [{ id: 1.2.3.4,
   *    cps: "http://example.com/cps",
   *    unotice: "explicit text" }]
   */
  getExtCertificatePolicies()

  // ===== read certificate =====================================
  /**
   * read PEM formatted X.509 certificate from string.<br/>
   * @param sCertPEM string for PEM formatted X.509 certificate
   * @example
   * x = new X509();
   * x.readCertPEM(sCertPEM); // read certificate
   */
  readCertPEM(sCertPEM)

  /**
   * read a hexadecimal string of X.509 certificate<br/>
   * @param sCertHex hexadecimal string of X.509 certificate
   * @description
   * NOTE: {@link X509#parseExt} will called internally since jsrsasign 7.2.0.
   * @example
   * x = new X509();
   * x.readCertHex("3082..."); // read certificate
   */
  readCertHex(sCertHex)

  /**
   * get certificate information as string.<br/>
   * @return certificate information string
   * @example
   * x = new X509();
   * x.readCertPEM(certPEM);
   * console.log(x.getInfo());
   * // this shows as following
   * Basic Fields
   *   serial number: 02ac5c266a0b409b8f0b79f2ae462577
   *   signature algorithm: SHA1withRSA
   *   issuer: /C=US/O=DigiCert Inc/OU=www.digicert.com/CN=DigiCert High Assurance EV Root CA
   *   notBefore: 061110000000Z
   *   notAfter: 311110000000Z
   *   subject: /C=US/O=DigiCert Inc/OU=www.digicert.com/CN=DigiCert High Assurance EV Root CA
   *   subject public key info:
   *     key algorithm: RSA
   *     n=c6cce573e6fbd4bb...
   *     e=10001
   * X509v3 Extensions:
   *   keyUsage CRITICAL:
   *     digitalSignature,keyCertSign,cRLSign
   *   basicConstraints CRITICAL:
   *     cA=true
   *   subjectKeyIdentifier :
   *     b13ec36903f8bf4701d498261a0802ef63642bc3
   *   authorityKeyIdentifier :
   *     kid=b13ec36903f8bf4701d498261a0802ef63642bc3
   * signature algorithm: SHA1withRSA
   * signature: 1c1a0697dcd79c9f...
   */
  getInfo(): string;

  /**
   * get distinguished name string in OpenSSL online format from hexadecimal string of ASN.1 DER X.500 name<br/>
   * @param hex hexadecimal string of ASN.1 DER distinguished name
   * @param idx index of hexadecimal string (DEFAULT=0)
   * @return OpenSSL online format distinguished name
   * @description
   * This static method converts from a hexadecimal string of
   * distinguished name (DN)
   * specified by 'hex' and 'idx' to OpenSSL oneline string representation (ex. /C=US/O=a).
   * @example
   * X509.hex2dn("3031310b3...") &rarr; /C=US/O=a/CN=b2+OU=b1
   */
  static hex2dn(hex: string, idx: number): string;

  /**
   * get relative distinguished name string in OpenSSL online format from hexadecimal string of ASN.1 DER RDN<br/>
   * @param hex hexadecimal string of ASN.1 DER concludes relative distinguished name
   * @param idx index of hexadecimal string (DEFAULT=0)
   * @return OpenSSL online format relative distinguished name
   * @description
   * This static method converts from a hexadecimal string of
   * relative distinguished name (RDN)
   * specified by 'hex' and 'idx' to LDAP string representation (ex. O=test+CN=test).<br/>
   * NOTE: Multi-valued RDN is supported since jsnrsasign 6.2.2 x509 1.1.10.
   * @example
   * X509.hex2rdn("310a3008060355040a0c0161") &rarr; O=a
   * X509.hex2rdn("31143008060355040a0c01613008060355040a0c0162") &rarr; O=a+O=b
   */
  static hex2rdn(hex: string, idx: number): string;

  /**
   * get string from hexadecimal string of ASN.1 DER AttributeTypeAndValue<br/>
   * @param hex hexadecimal string of ASN.1 DER concludes AttributeTypeAndValue
   * @param idx index of hexadecimal string (DEFAULT=0)
   * @return string representation of AttributeTypeAndValue (ex. C=US)
   * @description
   * This static method converts from a hexadecimal string of AttributeTypeAndValue
   * specified by 'hex' and 'idx' to LDAP string representation (ex. C=US).
   * @example
   * X509.hex2attrTypeValue("3008060355040a0c0161") &rarr; O=a
   * X509.hex2attrTypeValue("300806035504060c0161") &rarr; C=a
   * X509.hex2attrTypeValue("...3008060355040a0c0161...", 128) &rarr; O=a
   */
  static hex2attrTypeValue(hex: string, idx: number): string;

  /**
   * get RSA/DSA/ECDSA public key object from X.509 certificate hexadecimal string<br/>
   * @param h hexadecimal string of X.509 certificate for RSA/ECDSA/DSA public key
   * @return returns RSAKey/KJUR.crypto.{ECDSA,DSA} object of public key
   */
  static getPublicKeyFromCertHex(h: string) PublicKey;

  /**
   * get RSA/DSA/ECDSA public key object from PEM certificate string
   * @param sCertPEM PEM formatted RSA/ECDSA/DSA X.509 certificate
   * @return returns RSAKey/KJUR.crypto.{ECDSA,DSA} object of public key
   * @description
   * NOTE: DSA is also supported since x509 1.1.2.
   */
  static getPublicKeyFromCertPEM(sCertPEM: string): Hash;

  /**
   * get public key information from PEM certificate
   * @param sCertPEM string of PEM formatted certificate
   * @return hash of information for public key
   * @description
   * Resulted associative array has following properties:<br/>
   * <ul>
   * <li>algoid - hexadecimal string of OID of asymmetric key algorithm</li>
   * <li>algparam - hexadecimal string of OID of ECC curve name or null</li>
   * <li>keyhex - hexadecimal string of key in the certificate</li>
   * </ul>
   * NOTE: X509v1 certificate is also supported since x509.js 1.1.9.
   */
  static getPublicKeyInfoPropOfCertPEM(sCertPEM: string): Hash;
}

export declare namespace KJUR {
}

/**
 * convert an ArrayBuffer to a hexadecimal string
 * @param buffer ArrayBuffer
 * @return hexadecimal string
 * @description
 * This function converts from an ArrayBuffer to a hexadecimal string.
 * @example
 * var buffer = new ArrayBuffer(3);
 * var view = new DataView(buffer);
 * view.setUint8(0, 0xfa);
 * view.setUint8(1, 0xfb);
 * view.setUint8(2, 0x01);
 * ArrayBuffertohex(buffer) → "fafb01"
 */
export declare function ArrayBuffertohex(buffer: ArrayBuffer): string;

/**
 * convert a Base64 encoded string with new lines to a hexadecimal string
 * @param s Base64 encoded string with new lines
 * @return hexadecimal string
 * @description
 * This function converts from a Base64 encoded
 * string with new lines to a hexadecimal string.
 * This is useful to handle PEM encoded file.
 * This function removes any non-Base64 characters (i.e. not 0-9,A-Z,a-z,\,+,=)
 * including new line.
 * @example
 * hextob64nl(
 * "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4\r\n" +
 * "OTAxMjM0NTY3ODkwCg==\r\n")
 * →
 * "123456789012345678901234567890123456789012345678901234567890"
 */
export declare function b64nltohex(s: string): string;

/**
 * convert a Base64 encoded string to a Base64URL encoded string.
 * @param s Base64 encoded string
 * @return Base64URL encoded string
 * @example
 * b64tob64u("ab+c3f/==") → "ab-c3f_"
 */
export declare function b64tob64u(s: string): string;

/**
 * convert a Base64 encoded string to a UTF-8 encoded string including CJK or Latin.
 * @param s Base64 encoded string
 * @return UTF-8 encoded string
 */
export declare function b64toutf8(s: string): string;

/**
 * convert a Base64URL encoded string to a Base64 encoded string.
 * @param s Base64URL encoded string
 * @return Base64 encoded string
 * @example
 * b64utob64("ab-c3f_") → "ab+c3f/=="
 */
export declare function b64utob64(s: string): string;

/**
 * convert a Base64URL encoded string to a hexadecimal string.
 * @param s Base64URL encoded string
 * @return hexadecimal string
 */
export declare function b64utohex(s: string): string

/**
 * convert a Base64URL encoded string to a ASCII string.
 * NOTE: This can't be used for Base64URL encoded non ASCII characters.
 * @param s Base64URL encoded string
 * @return ASCII string
 */
export declare function b64utos(s: string): string

/**
 * convert a Base64URL encoded string to a UTF-8 encoded string including CJK or Latin.
 * @param s Base64URL encoded string
 * @return UTF-8 encoded string
 */
export declare function b64utoutf8(s: string): string

/**
 * convert an array of bytes(Number) to hexadecimal string.
 * @param a array of bytes
 * @return hexadecimal string
 */
export declare function BAtohex(a: Array<number>): string

/**
 * convert an array of character codes to a string
 * @param a array of character codes
 * @return s
 */
export declare function BAtos(a: Array<number>): string

/**
 * Date object to zulu time string
 * @param d Date object for specified time
 * @param flagUTCTime if this is true year will be YY otherwise YYYY
 * @param flagMilli if this is true result concludes milliseconds
 * @return GeneralizedTime or UTCTime string (ex. 20170412235959.384Z)
 * @description
 * This function converts from Date object to GeneralizedTime string (i.e. YYYYMMDDHHmmSSZ) or
 * UTCTime string (i.e. YYMMDDHHmmSSZ).
 * As for UTCTime, if year "YY" is equal or less than 49 then it is 20YY.
 * If year "YY" is equal or greater than 50 then it is 19YY.
 * If flagMilli is true its result concludes milliseconds such like
 * "20170520235959.42Z".
 * @example
 * d = new Date(Date.UTC(2017,4,20,23,59,59,670));
 * datetozulu(d) → "20170520235959Z"
 * datetozulu(d, true) → "170520235959Z"
 * datetozulu(d, false, true) → "20170520235959.67Z"
 */
export declare function datetozulu(d: Date, flagUTCTime: boolean, flagMilli: boolean): string

/**
 * convert UTFa hexadecimal string to a URLComponent string such like "%67%68".
 * Note that these "<code>0-9A-Za-z!'()*-._~</code>" characters will not
 * converted to "%xx" format by builtin 'encodeURIComponent()' function.
 * However this 'encodeURIComponentAll()' function will convert
 * all of characters into "%xx" format.
 * @param s hexadecimal string
 * @return URIComponent string such like "%67%68"
 */
export declare function encodeURIComponentAll(s: string): string

/**
 * convert a hexadecimal string to an ArrayBuffer
 * @param hex hexadecimal string
 * @return ArrayBuffer
 * @description
 * This function converts from a hexadecimal string to an ArrayBuffer.
 * @example
 * hextoArrayBuffer("fffa01") → ArrayBuffer of [255, 250, 1]
 */
export declare function hextoArrayBuffer(hex: string): ArrayBuffer;

/**
 * convert a hexadecimal string to a Base64URL encoded string.
 * @param s hexadecimal string
 * @return Base64URL encoded string
 * @description
 * convert a hexadecimal string to a Base64URL encoded string.
 * NOTE: If leading "0" is omitted and odd number length for
 * hexadecimal leading "0" is automatically added.
 */
export declare function hextob64(s: string): string

/**
 * convert a hexadecimal string to Base64 encoded string with new lines
 * @param s hexadecimal string
 * @return resulted Base64 encoded string with new lines
 * @description
 * This function converts from a hexadecimal string to Base64 encoded
 * string with new lines for each 64 characters. This is useful for
 * PEM encoded file.
 * @example
 * hextob64nl("123456789012345678901234567890123456789012345678901234567890")
 * →
 * MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4 // new line
 * OTAxMjM0NTY3ODkwCg==
 */
export declare function hextob64nl(s: string): string

/**
 * convert a hexadecimal string to a Base64URL encoded string.
 * @param s hexadecimal string
 * @return Base64URL encoded string
 * @description
 * convert a hexadecimal string to a Base64URL encoded string.
 * NOTE: If leading "0" is omitted and odd number length for
 * hexadecimal leading "0" is automatically added.
 */
export declare function hextob64u(s: string): string

/**
 * get PEM string from hexadecimal data and header string
 * @param dataHex hexadecimal string of PEM body
 * @param pemHeader PEM header string (ex. 'RSA PRIVATE KEY')
 * @return PEM formatted string of input data
 * @description
 * This function converts a hexadecimal string to a PEM string with
 * a specified header. Its line break will be CRLF("\r\n").
 * @example
 * hextopem('616161', 'RSA PRIVATE KEY') →
 * -----BEGIN PRIVATE KEY-----
 * YWFh
 * -----END PRIVATE KEY-----
 */
export declare function hextopem(dataHex: string, pemHeader: string): string

/**
 * canonicalize hexadecimal string of positive integer
 * @param s hexadecimal string
 * @return canonicalized hexadecimal string of positive integer
 * @description
 * This method canonicalize a hexadecimal string of positive integer
 * for two's complement representation.
 * Canonicalized hexadecimal string of positive integer will be:
 * * Its length is always even.
 * * If odd length it will be padded with leading zero.
 * * If it is even length and its first character is "8" or greater,
 * it will be padded with "00" to make it positive integer.
 * @example
 * hextoposhex("abcd") → "00abcd"
 * hextoposhex("1234") → "1234"
 * hextoposhex("12345") → "012345"
 */
export declare function hextoposhex(s: string): string

/**
 * convert a hexadecimal encoded string to raw string including non printable characters.
 * @param s hexadecimal encoded string
 * @return raw string
 * @example
 * hextorstr("610061") → "a\x00a"
 */
export declare function hextorstr(s: string): string

/**
 * convert a hexadecimal string to a URLComponent string such like "%67%68".
 * @param s hexadecimal string
 * @return URIComponent string such like "%67%68"
 */
export declare function hextouricmp(s: string): string

/**
 * convert a hexadecimal encoded string to a UTF-8 encoded string including CJK or Latin.
 * Note that when input is improper hexadecimal string as UTF-8 string, this function returns
 * 'null'.
 * @param s hexadecimal encoded string
 * @return UTF-8 encoded string or null
 */
export declare function hextoutf8(s: string): string

/**
 * convert string of integer array to hexadecimal string.
 * @param s string of integer array
 * @return hexadecimal string
 * @throws "malformed integer array string: *" for wrong input
 * @description
 * This function converts a string of JavaScript integer array to
 * a hexadecimal string. Each integer value shall be in a range
 * from 0 to 255 otherwise it raise exception. Input string can
 * have extra space or newline string so that they will be ignored.
 *
 * @example
 * intarystrtohex(" [123, 34, 101, 34, 58] ")
 * → 7b2265223a (i.e. '{"e":' as string)
 */
export declare function intarystrtohex(s: string): string

/**
 * convert all UNIX new line("\r\n") to DOS new line("\n") in
 * a String "s".
 * @param s string
 * @return converted string
 */
export declare function newline_toDos(s: string): string

/**
 * convert all DOS new line("\r\n") to UNIX new line("\n") in
 * a String "s".
 * @param s string
 * @return converted string
 */
export declare function newline_toUnix(s: string): string

/**
 * get hexadecimal string from PEM format data
 * @param s PEM formatted string
 * @param sHead PEM header string without BEGIN/END(OPTION)
 * @return hexadecimal string data of PEM contents
 * @description
 * This static method gets a hexacedimal string of contents
 * from PEM format data. You can explicitly specify PEM header
 * by sHead argument.
 * Any space characters such as white space or new line
 * will be omitted.
 * NOTE: Now {@link KEYUTIL.getHexFromPEM} and {@link X509.pemToHex}
 * have been deprecated since jsrsasign 7.2.1.
 * Please use this method instead.
 * @example
 * pemtohex("-----BEGIN PUBLIC KEY...") → "3082..."
 * pemtohex("-----BEGIN CERTIFICATE...", "CERTIFICATE") → "3082..."
 * pemtohex(" \r\n-----BEGIN DSA PRIVATE KEY...") → "3082..."
 */
export declare function pemtohex(s: string, sHead: string): string

/**
 * read file and return file contents
 * @param binFile file name to be read
 * @return raw string of file contents
 * @description
 * This function only works in Node.js.
 */
export declare function readFile(binFile: string): string

/**
 * read binary file and return file contents as hexadecimal string
 * @param binFile file name to be read
 * @return hexadecimal string of file contents
 * @description
 * This function only works in Node.js.
 */
export declare function readFileHexByBin(binFile: string): string

/**
 * read file and return file contents as utf-8 string
 * @param utf8File file name to be read
 * @return utf-8 string of file contents
 * @description
 * This function only works in Node.js.
 */
export declare function readFileUTF8(utf8File: string): string

/**
 * convert a raw string including non printable characters to hexadecimal encoded string.
 * @param s raw string
 * @return hexadecimal encoded string
 * @example
 * rstrtohex("a\x00a") → "610061"
 */
export declare function rstrtohex(s: string): string

/**
 * save raw string to file
 * @param binFile file name to save contents.
 * @param rawString string contents to be saved.
 * @description
 * This function only works in Node.js.
 */
export declare function saveFile(binFile: string, rawString: string): void;

/**
 * save data represented by hexadecimal string to file
 * @param binFile file name to save contents.
 * @param hexString hexadecimal string to be saved.
 * @description
 * This function only works in Node.js.
 */
export declare function saveFileBinByHex(binFile: string, hexString: string): void;

/**
 * convert a ASCII string to a Base64 encoded string.
 * NOTE: This can't be used for non ASCII characters.
 * @param s ASCII string
 * @return Base64 encoded string
 */
export declare function stob64(s: string): string

/**
 * convert a ASCII string to a Base64URL encoded string.
 * NOTE: This can't be used for non ASCII characters.
 * @param s ASCII string
 * @return Base64URL encoded string
 */
export declare function stob64u(s: string): string

/**
 * convert a string to an array of character codes
 * @param s
 * @return {Array of Numbers}
 */
export declare function stoBA(s: string): string

/**
 * convert a ASCII string to a hexadecimal string of ASCII codes.
 * NOTE: This can't be used for non ASCII characters.
 * @param s ASCII string
 * @return hexadecimal string
 */
export declare function stohex(s: string): string

/**
 * find index of string where two string differs
 * @param s1 string to compare
 * @param s2 string to compare
 * @return string index of where character differs. Return -1 if same.
 * @example
 * strdiffidx("abcdefg", "abcd4fg") -> 4
 * strdiffidx("abcdefg", "abcdefg") -> -1
 * strdiffidx("abcdefg", "abcdef") -> 6
 * strdiffidx("abcdefgh", "abcdef") -> 6
 */
export declare function strdiffidx(s1: string, s2: string): number;

/**
 * convert a URLComponent string such like "%67%68" to a hexadecimal string.
 * @param s URIComponent string such like "%67%68"
 * @return hexadecimal string
 */
export declare function uricmptohex(s: string): string

/**
 * convert a UTF-8 encoded string including CJK or Latin to a Base64 encoded string.
 * @param s UTF-8 encoded string
 * @return Base64 encoded string
 */
export declare function utf8tob64(s: string): string

/**
 * convert a UTF-8 encoded string including CJK or Latin to a Base64URL encoded string.
 * @param s UTF-8 encoded string
 * @return Base64URL encoded string
 */
export declare function utf8tob64u(s: string): string

/**
 * convert a UTF-8 encoded string including CJK or Latin to a hexadecimal encoded string.
 * @param s UTF-8 encoded string
 * @return hexadecimal encoded string
 */
export declare function utf8tohex(s: string): string

/**
 * GeneralizedTime or UTCTime string to Date object
 * @param s GeneralizedTime or UTCTime string (ex. 20170412235959.384Z)
 * @return Date object for specified time
 * @description
 * This function converts from GeneralizedTime string (i.e. YYYYMMDDHHmmSSZ) or
 * UTCTime string (i.e. YYMMDDHHmmSSZ) to Date object.
 * Argument string may have fraction of seconds and
 * its length is one or more digits such as "20170410235959.1234567Z".
 * As for UTCTime, if year "YY" is equal or less than 49 then it is 20YY.
 * If year "YY" is equal or greater than 50 then it is 19YY.
 * @example
 * zulutodate(  "071231235959Z").toUTCString()   → "Mon, 31 Dec 2007 23:59:59 GMT"
 * zulutodate(  "071231235959.1Z").toUTCString() → "Mon, 31 Dec 2007 23:59:59 GMT"
 * zulutodate("20071231235959Z").toUTCString()   → "Mon, 31 Dec 2007 23:59:59 GMT"
 * zulutodate(  "071231235959.34").getMilliseconds() → 340
 */
export declare function zulutodate(s: string): Date;

/**
 * GeneralizedTime or UTCTime string to milliseconds from Unix origin
 * @param s GeneralizedTime or UTCTime string (ex. 20170412235959.384Z)
 * @return milliseconds from Unix origin time (i.e. Jan 1, 1970 0:00:00 UTC)
 * @description
 * This function converts from GeneralizedTime string (i.e. YYYYMMDDHHmmSSZ) or
 * UTCTime string (i.e. YYMMDDHHmmSSZ) to milliseconds from Unix origin time
 * (i.e. Jan 1 1970 0:00:00 UTC).
 * Argument string may have fraction of seconds and
 * its length is one or more digits such as "20170410235959.1234567Z".
 * As for UTCTime, if year "YY" is equal or less than 49 then it is 20YY.
 * If year "YY" is equal or greater than 50 then it is 19YY.
 * @example
 * zulutomsec(  "071231235959Z")       → 1199145599000 #Mon, 31 Dec 2007 23:59:59 GMT
 * zulutomsec(  "071231235959.1Z")     → 1199145599100 #Mon, 31 Dec 2007 23:59:59 GMT
 * zulutomsec(  "071231235959.12345Z") → 1199145599123 #Mon, 31 Dec 2007 23:59:59 GMT
 * zulutomsec("20071231235959Z")       → 1199145599000 #Mon, 31 Dec 2007 23:59:59 GMT
 * zulutomsec(  "931231235959Z")       → -410227201000 #Mon, 31 Dec 1956 23:59:59 GMT
 */
export declare function zulutomsec(s: string): number;


/**
 * GeneralizedTime or UTCTime string to seconds from Unix origin
 * @param s GeneralizedTime or UTCTime string (ex. 20170412235959.384Z)
 * @return seconds from Unix origin time (i.e. Jan 1, 1970 0:00:00 UTC)
 * @description
 * This function converts from GeneralizedTime string (i.e. YYYYMMDDHHmmSSZ) or
 * UTCTime string (i.e. YYMMDDHHmmSSZ) to seconds from Unix origin time
 * (i.e. Jan 1 1970 0:00:00 UTC). Argument string may have fraction of seconds
 * however result value will be omitted.
 * As for UTCTime, if year "YY" is equal or less than 49 then it is 20YY.
 * If year "YY" is equal or greater than 50 then it is 19YY.
 * @example
 * zulutosec(  "071231235959Z")       → 1199145599 #Mon, 31 Dec 2007 23:59:59 GMT
 * zulutosec(  "071231235959.1Z")     → 1199145599 #Mon, 31 Dec 2007 23:59:59 GMT
 * zulutosec("20071231235959Z")       → 1199145599 #Mon, 31 Dec 2007 23:59:59 GMT
 */
export declare function zulutosec(s: string): number

export as namespace jsrsasign;
