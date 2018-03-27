declare namespace jsrsasign.KJUR.asn1.cades {
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
}
