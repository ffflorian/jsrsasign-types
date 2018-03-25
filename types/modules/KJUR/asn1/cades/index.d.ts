/// <reference path="./cms/index.d.ts" />
/// <reference path="./CAdESUtil.d.ts" />

declare namespace jsrsasign.KJUR.asn1 {
  namespace cades {
    /**
     * class for RFC 5126 CAdES SignaturePolicyIdentifier attribute
     * @param params associative array of parameters
     * @description
     * ```
     * SignaturePolicyIdentifier ::= CHOICE {
     *    signaturePolicyId       SignaturePolicyId,
     *    signaturePolicyImplied  SignaturePolicyImplied } -- not used
     *
     * SignaturePolicyImplied ::= NULL
     * SignaturePolicyId ::= SEQUENCE {
     *    sigPolicyId           SigPolicyId,
     *    sigPolicyHash         SigPolicyHash,
     *    sigPolicyQualifiers   SEQUENCE SIZE (1..MAX) OF
     *                             SigPolicyQualifierInfo OPTIONAL }
     * SigPolicyId ::= OBJECT IDENTIFIER
     * SigPolicyHash ::= OtherHashAlgAndValue
     * ```
     * @example
     * var o = new KJUR.asn1.cades.SignaturePolicyIdentifier({
     *   oid: '1.2.3.4.5',
     *   hash: {alg: 'sha1', hash: 'a1a2a3a4...'}
     * });
     */
    /*
     * id-aa-ets-sigPolicyId OBJECT IDENTIFIER ::= { iso(1)
     *    member-body(2) us(840) rsadsi(113549) pkcs(1) pkcs9(9)
     *    smime(16) id-aa(2) 15 }
     *
     * signature-policy-identifier attribute values have ASN.1 type
     * SignaturePolicyIdentifier:
     *
     * SigPolicyQualifierInfo ::= SEQUENCE {
     *    sigPolicyQualifierId  SigPolicyQualifierId,
     *    sigQualifier          ANY DEFINED BY sigPolicyQualifierId }
     *
     * sigpolicyQualifierIds defined in the present document:
     * SigPolicyQualifierId ::= OBJECT IDENTIFIER
     * id-spq-ets-uri OBJECT IDENTIFIER ::= { iso(1)
     *    member-body(2) us(840) rsadsi(113549) pkcs(1) pkcs9(9)
     *    smime(16) id-spq(5) 1 }
     *
     * SPuri ::= IA5String
     *
     * id-spq-ets-unotice OBJECT IDENTIFIER ::= { iso(1)
     *    member-body(2) us(840) rsadsi(113549) pkcs(1) pkcs9(9)
     *    smime(16) id-spq(5) 2 }
     *
     * SPUserNotice ::= SEQUENCE {
     *    noticeRef        NoticeReference OPTIONAL,
     *    explicitText     DisplayText OPTIONAL}
     *
     * NoticeReference ::= SEQUENCE {
     *    organization     DisplayText,
     *    noticeNumbers    SEQUENCE OF INTEGER }
     *
     * DisplayText ::= CHOICE {
     *    visibleString    VisibleString  (SIZE (1..200)),
     *    bmpString        BMPString      (SIZE (1..200)),
     *    utf8String       UTF8String     (SIZE (1..200)) }
     */
    class SignaturePolicyIdentifier extends cms.Attribute {
      constructor(params?: { oid: string; hash: { alg: string; hash: string } });
    }

    /**
     * class for OtherHashAlgAndValue ASN.1 object
     * @param params associative array of parameters
     * @description
     * ```
     * OtherHashAlgAndValue ::= SEQUENCE {
     *    hashAlgorithm   AlgorithmIdentifier,
     *    hashValue       OtherHashValue }
     * OtherHashValue ::= OCTET STRING
     * ```
     */
    class OtherHashAlgAndValue extends ASN1Object {
      constructor(params?: { alg: string; hash: string });
    }

    /**
     * class for RFC 5126 CAdES SignatureTimeStamp attribute
     * @param params associative array of parameters
     * @description
     * ```
     * id-aa-signatureTimeStampToken OBJECT IDENTIFIER ::=
     *    1.2.840.113549.1.9.16.2.14
     * SignatureTimeStampToken ::= TimeStampToken
     * ```
     */
    class SignatureTimeStamp extends cms.Attribute {
      constructor(params?: { res: string | ASN1Object; tst: string | ASN1Object })
    }

    /**
     * class for RFC 5126 CAdES CompleteCertificateRefs attribute
     * @param params associative array of parameters
     * @description
     * ```
     * id-aa-ets-certificateRefs OBJECT IDENTIFIER =
     *    1.2.840.113549.1.9.16.2.21
     * CompleteCertificateRefs ::=  SEQUENCE OF OtherCertID
     * ```
     * @example
     * o = new KJUR.asn1.cades.CompleteCertificateRefs([certPEM1,certPEM2]);
     */
    class CompleteCertificateRefs extends cms.Attribute {
      constructor(params?: { length: number });

      /**
       * set value by array
       * @param a array of `KJUR.asn1.cades.OtherCertID` argument
       */
      setByArray(a: OtherCertID[]): void;
    }

    /**
     * class for OtherCertID ASN.1 object
     * @param params associative array of parameters
     * @description
     * ```
     * OtherCertID ::= SEQUENCE {
     *    otherCertHash    OtherHash,
     *    issuerSerial     IssuerSerial OPTIONAL }
     * ```
     * @example
     * o = new KJUR.asn1.cades.OtherCertID(certPEM);
     * o = new KJUR.asn1.cades.OtherCertID({cert:certPEM, hasis: false});
     */
    class OtherCertID extends ASN1Object {
      constructor(params?: string | { hasis: boolean; cert: string })
      /**
       * set value by PEM string of certificate
       * @param certPEM PEM string of certificate
       * @description
       * This method will set value by a PEM string of a certificate.
       * This will add IssuerAndSerialNumber by default
       * which depends on hasIssuerSerial flag.
       */
      setByCertPEM(certPEM: string): void;

      getEncodedHex(): string;
    }

    /**
     * class for OtherHash ASN.1 object
     * @param params associative array of parameters
     * @description
     * ```
     * OtherHash ::= CHOICE {
     *    sha1Hash   OtherHashValue,  -- This contains a SHA-1 hash
     *    otherHash  OtherHashAlgAndValue}
     * OtherHashValue ::= OCTET STRING
     * ```
     * @example
     * o = new KJUR.asn1.cades.OtherHash("1234");
     * o = new KJUR.asn1.cades.OtherHash(certPEMStr); // default alg=sha256
     * o = new KJUR.asn1.cades.OtherHash({alg: 'sha256', hash: '1234'});
     * o = new KJUR.asn1.cades.OtherHash({alg: 'sha256', cert: certPEM});
     * o = new KJUR.asn1.cades.OtherHash({cert: certPEM});
     */
    class OtherHash extends ASN1Object {
      constructor(params?: string | { alg: string; hash: string } | { alg: string; cert: string } | { cert: string });
      /**
       * set value by PEM string of certificate
       * @param certPEM PEM string of certificate
       * @description
       * This method will set value by a PEM string of a certificate.
       * An algorithm used to hash certificate data will
       * be defined by 'alg' property and 'sha256' is default.
       */
      setByCertPEM(certPEM: string): void;
      getEncodedHex(): string;
    }
  }
}
