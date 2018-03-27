/// <reference path="./CMSUtil.d.ts" />

declare namespace jsrsasign.KJUR.asn1 {
  /**
   * kjur's ASN.1 class for Cryptographic Message Syntax(CMS)
   *
   * This name space provides
   * [RFC 5652 Cryptographic Message Syntax (CMS)](https://tools.ietf.org/html/rfc5652) SignedData generator.
   *
   * __FEATURES__
   *
   * - easily generate CMS SignedData
   * - easily verify CMS SignedData
   * - APIs are very similar to BouncyCastle library ASN.1 classes. So easy to learn.
   *
   *
   * __PROVIDED CLASSES__
   *
   * - `KJUR.asn1.cms.SignedData`
   * - `KJUR.asn1.cms.SignerInfo`
   * - `KJUR.asn1.cms.AttributeList`
   * - `KJUR.asn1.cms.ContentInfo`
   * - `KJUR.asn1.cms.EncapsulatedContentInfo`
   * - `KJUR.asn1.cms.IssuerAndSerialNumber`
   * - `KJUR.asn1.cms.CMSUtil`
   * - `KJUR.asn1.cms.Attribute`
   * - `KJUR.asn1.cms.ContentType`
   * - `KJUR.asn1.cms.MessageDigest`
   * - `KJUR.asn1.cms.SigningTime`
   * - `KJUR.asn1.cms.SigningCertificate`
   * - `KJUR.asn1.cms.SigningCertificateV2`
   */
  namespace cms {
    /**
     * Attribute class for base of CMS attribute
     * @param params associative array of parameters
     * @description
     * ```
     * Attributes ::= SET OF Attribute
     * Attribute ::= SEQUENCE {
     *    type               OBJECT IDENTIFIER,
     *    values             AttributeSetValue }
     * AttributeSetValue ::= SET OF ANY
     * ```
     */
    class Attribute extends ASN1Object {
      constructor();
      getEncodedHex(): string;
    }

    /**
     * class for CMS ContentType attribute
     * @param params associative array of parameters
     * @description
     * ```
     * Attribute ::= SEQUENCE {
     *    type               OBJECT IDENTIFIER,
     *    values             AttributeSetValue }
     * AttributeSetValue ::= SET OF ANY
     * ContentType ::= OBJECT IDENTIFIER
     * ```
     * @example
     * o = new KJUR.asn1.cms.ContentType({name: 'data'});
     * o = new KJUR.asn1.cms.ContentType({oid: '1.2.840.113549.1.9.16.1.4'});
     */
    class ContentType extends Attribute {
      constructor(params?: { name: string } | { oid: string });
    }

    /**
     * class for CMS MessageDigest attribute
     * @param params associative array of parameters
     * @description
     * ```
     * Attribute ::= SEQUENCE {
     *    type               OBJECT IDENTIFIER,
     *    values             AttributeSetValue }
     * AttributeSetValue ::= SET OF ANY
     * MessageDigest ::= OCTET STRING
     * ```
     * @example
     * o = new KJUR.asn1.cms.MessageDigest({hex: 'a1a2a3a4...'});
     */
    class MessageDigest extends Attribute {
      constructor(params?: { hex: string });
    }

    /**
     * class for CMS SigningTime attribute
     * @param params associative array of parameters
     * @description
     * ```
     * Attribute ::= SEQUENCE {
     *    type               OBJECT IDENTIFIER,
     *    values             AttributeSetValue }
     * AttributeSetValue ::= SET OF ANY
     * SigningTime  ::= Time
     * Time ::= CHOICE {
     *    utcTime UTCTime,
     *    generalTime GeneralizedTime }
     * ```
     * @example
     * o = new KJUR.asn1.cms.SigningTime(); // current time UTCTime by default
     * o = new KJUR.asn1.cms.SigningTime({type: 'gen'}); // current time GeneralizedTime
     * o = new KJUR.asn1.cms.SigningTime({str: '20140517093800Z'}); // specified GeneralizedTime
     * o = new KJUR.asn1.cms.SigningTime({str: '140517093800Z'}); // specified UTCTime
     */
    class SigningTime extends Attribute {
      constructor(params?: TypeParam | StringParam);
    }

    /**
     * class for CMS SigningCertificate attribute
     * @param params associative array of parameters
     * @description
     * ```
     * Attribute ::= SEQUENCE {
     *    type               OBJECT IDENTIFIER,
     *    values             AttributeSetValue }
     * AttributeSetValue ::= SET OF ANY
     * SigningCertificate ::= SEQUENCE {
     *    certs SEQUENCE OF ESSCertID,
     *    policies SEQUENCE OF PolicyInformation OPTIONAL }
     * ESSCertID ::= SEQUENCE {
     *    certHash Hash,
     *    issuerSerial IssuerSerial OPTIONAL }
     * IssuerSerial ::= SEQUENCE {
     *    issuer GeneralNames,
     *    serialNumber CertificateSerialNumber }
     * ```
     * @example
     * o = new KJUR.asn1.cms.SigningCertificate({array: [certPEM]});
     */
    class SigningCertificate extends Attribute {
      constructor(params?: ArrayParam<string>);
      setCerts(listPEM: string[]): void;
    }

    /**
     * class for CMS SigningCertificateV2 attribute
     * @param params associative array of parameters
     * @description
     * ```
     * oid-signingCertificateV2 = 1.2.840.113549.1.9.16.2.47
     * Attribute ::= SEQUENCE {
     *    type               OBJECT IDENTIFIER,
     *    values             AttributeSetValue }
     * AttributeSetValue ::= SET OF ANY
     * SigningCertificateV2 ::=  SEQUENCE {
     *    certs        SEQUENCE OF ESSCertIDv2,
     *    policies     SEQUENCE OF PolicyInformation OPTIONAL }
     * ESSCertIDv2 ::=  SEQUENCE {
     *    hashAlgorithm           AlgorithmIdentifier
     *                            DEFAULT {algorithm id-sha256},
     *    certHash                Hash,
     *    issuerSerial            IssuerSerial OPTIONAL }
     * Hash ::= OCTET STRING
     * IssuerSerial ::= SEQUENCE {
     *    issuer                  GeneralNames,
     *    serialNumber            CertificateSerialNumber }
     * ```
     * @example
     * // hash algorithm is sha256 by default:
     * o = new KJUR.asn1.cms.SigningCertificateV2({array: [certPEM]});
     * o = new KJUR.asn1.cms.SigningCertificateV2({array: [certPEM],
     *                                             hashAlg: 'sha512'});
     */
    class SigningCertificateV2 extends Attribute {
      constructor(params?: ArrayParam<string> | { array: string[]; hashalg: string });
      setCerts(listPEM: string[], hashAlg: string): void;
    }

    /**
     * class for IssuerAndSerialNumber ASN.1 structure for CMS
     * @param params associative array of parameters
     * @description
     * ```
     * IssuerAndSerialNumber ::= SEQUENCE {
     *    issuer Name,
     *    serialNumber CertificateSerialNumber }
     * CertificateSerialNumber ::= INTEGER
     * ```
     * @example
     * // specify by X500Name and DERInteger
     * o = new KJUR.asn1.cms.IssuerAndSerialNumber(
     *      {issuer: {str: '/C=US/O=T1'}, serial {int: 3}});
     * // specify by PEM certificate
     * o = new KJUR.asn1.cms.IssuerAndSerialNumber({cert: certPEM});
     * o = new KJUR.asn1.cms.IssuerAndSerialNumber(certPEM); // since 1.0.3
     */
    class IssuerAndSerialNumber extends ASN1Object {
      constructor(params?: string | { cert: string } | { issuer: any; serial: DERInteger | IntegerParam | BigIntegerParam | HexParam | number });
      setByCertPEM(certPEM: string): void;
      getEncodedHex(): string;
    }

    /**
     * class for Attributes ASN.1 structure for CMS
     * @param params associative array of parameters
     * @description
     * ```
     * Attributes ::= SET OF Attribute
     * Attribute ::= SEQUENCE {
     *    type               OBJECT IDENTIFIER,
     *    values             AttributeSetValue }
     * ```
     * @example
     * // specify by X500Name and DERInteger
     * o = new KJUR.asn1.cms.AttributeList({sorted: false}); // ASN.1 BER unsorted SET OF
     * o = new KJUR.asn1.cms.AttributeList();  // ASN.1 DER sorted by default
     * o.clear();                              // clear list of Attributes
     * n = o.length();                         // get number of Attribute
     * o.add(new KJUR.asn1.cms.SigningTime()); // add SigningTime attribute
     * hex = o.getEncodedHex();                // get hex encoded ASN.1 data
     */
    class AttributeList extends ASN1Object {
      constructor(params?: { sorted: boolean });
      add(item: Attribute): void;
      length(): number;
      clear(): void;
      getEncodedHex(): string;
    }

    /**
     * class for SignerInfo ASN.1 structure of CMS SignedData
     * @param params associative array of parameters
     * @description
     * ```
     * SignerInfo ::= SEQUENCE {
     *    version CMSVersion,
     *    sid SignerIdentifier,
     *    digestAlgorithm DigestAlgorithmIdentifier,
     *    signedAttrs [0] IMPLICIT SignedAttributes OPTIONAL,
     *    signatureAlgorithm SignatureAlgorithmIdentifier,
     *    signature SignatureValue,
     *    unsignedAttrs [1] IMPLICIT UnsignedAttributes OPTIONAL }
     * ```
     * @example
     * o = new KJUR.asn1.cms.SignerInfo();
     * o.setSignerIdentifier(certPEMstring);
     * o.dSignedAttrs.add(new KJUR.asn1.cms.ContentType({name: 'data'}));
     * o.dSignedAttrs.add(new KJUR.asn1.cms.MessageDigest({hex: 'a1b2...'}));
     * o.dSignedAttrs.add(new KJUR.asn1.cms.SigningTime());
     * o.sign(privteKeyParam, "SHA1withRSA");
     */
    class SignerInfo extends ASN1Object {
      constructor(params?: string);
      setSignerIdentifier(params: string): void;

      /**
       * set ContentType/MessageDigest/DigestAlgorithms for SignerInfo/SignedData
       * @param params JSON parameter to set content related field
       * @description
       * This method will specify following fields by a parameters:
       *
       * - add ContentType signed attribute by encapContentInfo
       * - add MessageDigest signed attribute by encapContentInfo and hashAlg
       * - add a hash algorithm used in MessageDigest to digestAlgorithms field of SignedData
       * - set a hash algorithm used in MessageDigest to digestAlgorithm field of SignerInfo
       *
       * Argument 'params' is an associative array having following elements:
       *
       * - eciObj - `KJUR.asn1.cms.EncapsulatedContentInfo` object
       * - sdObj - `KJUR.asn1.cms.SignedData` object (Option) to set DigestAlgorithms
       * - hashAlg - string of hash algorithm name which is used for MessageDigest attribute
       *
       * some of elements can be omited.
       * @example
       * sd = new KJUR.asn1.cms.SignedData();
       * signerInfo.setForContentAndHash({sdObj: sd,
       *                                  eciObj: sd.dEncapContentInfo,
       *                                  hashAlg: 'sha256'});
       */
      setForContentAndHash(params: { eciObj: EncapsulatedContentInfo; sdobj: SignedData; hashAlg: string }): void;

      sign(keyParam: any, sigAlg: string): void;

      addUnsigned(attr: Attribute): void;

      getEncodedHex(): string;
    }

    /**
     * class for EncapsulatedContentInfo ASN.1 structure for CMS
     * @param params associative array of parameters
     * @description
     * ```
     * EncapsulatedContentInfo ::= SEQUENCE {
     *    eContentType ContentType,
     *    eContent [0] EXPLICIT OCTET STRING OPTIONAL }
     * ContentType ::= OBJECT IDENTIFIER
     * ```
     * @example
     * o = new KJUR.asn1.cms.EncapsulatedContentInfo();
     * o.setContentType('1.2.3.4.5');     // specify eContentType by OID
     * o.setContentType('data');          // specify eContentType by name
     * o.setContentValueHex('a1a2a4...'); // specify eContent data by hex string
     * o.setContentValueStr('apple');     // specify eContent data by UTF-8 string
     * // for detached contents (i.e. data not concluded in eContent)
     * o.isDetached = true;               // false as default
     */
    class EncapsulatedContentInfo extends ASN1Object {
      constructor(params?: 'string');
      setContentType(nameOrOid: string): void;
      setContentValue(params: HexParam | StringParam): void;
      setContentValueHex(valueHex: string): void;
      setContentValueStr(valueStr: string): void;
      getEncodedHex(): string;
    }

    /**
     * class for ContentInfo ASN.1 structure for CMS
     * @param params associative array of parameters
     * @description
     * ```
     * ContentInfo ::= SEQUENCE {
     *    contentType ContentType,
     *    content [0] EXPLICIT ANY DEFINED BY contentType }
     * ContentType ::= OBJECT IDENTIFIER
     * ```
     * @example
     * a = [new KJUR.asn1.DERInteger({int: 1}),
     *      new KJUR.asn1.DERInteger({int: 2})];
     * seq = new KJUR.asn1.DERSequence({array: a});
     * o = new KJUR.asn1.cms.ContentInfo({type: 'data', obj: seq});
     */
    class ContentInfo extends ASN1Object {
      constructor(params?: TypeParam | ASN1ObjectParam);
      setContentType(params: string): void;
      getEncodedHex(): string;
    }

    /**
     * class for SignerInfo ASN.1 structure of CMS SignedData
     * @param params associative array of parameters
     *
     * @description
     * ```
     * SignedData ::= SEQUENCE {
     *    version CMSVersion,
     *    digestAlgorithms DigestAlgorithmIdentifiers,
     *    encapContentInfo EncapsulatedContentInfo,
     *    certificates [0] IMPLICIT CertificateSet OPTIONAL,
     *    crls [1] IMPLICIT RevocationInfoChoices OPTIONAL,
     *    signerInfos SignerInfos }
     * SignerInfos ::= SET OF SignerInfo
     * CertificateSet ::= SET OF CertificateChoices
     * DigestAlgorithmIdentifiers ::= SET OF DigestAlgorithmIdentifier
     * CertificateSet ::= SET OF CertificateChoices
     * RevocationInfoChoices ::= SET OF RevocationInfoChoice
     * ```
     *
     * @example
     * sd = new KJUR.asn1.cms.SignedData();
     * sd.dEncapContentInfo.setContentValueStr("test string");
     * sd.signerInfoList[0].setForContentAndHash({sdObj: sd,
     *                                            eciObj: sd.dEncapContentInfo,
     *                                            hashAlg: 'sha256'});
     * sd.signerInfoList[0].dSignedAttrs.add(new KJUR.asn1.cms.SigningTime());
     * sd.signerInfoList[0].setSignerIdentifier(certPEM);
     * sd.signerInfoList[0].sign(prvP8PEM, "SHA256withRSA");
     * hex = sd.getContentInfoEncodedHex();
     */
    class SignedData extends ASN1Object {
      constructor();
      addCertificatesByPEM(certPEM: string): void;
      getEncodedHex(): string;
      getContentInfo(): ContentInfo;
      getContentInfoEncodedHex(): string;
      getPEM(): string;
    }
  }
}
