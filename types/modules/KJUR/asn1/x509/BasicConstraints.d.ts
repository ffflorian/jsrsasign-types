declare namespace jsrsasign.KJUR.asn1.x509 {
  /**
   * BasicConstraints ASN.1 structure class
   * @param params associative array of parameters (ex. {'cA': true, 'critical': true})
   * @extends KJUR.asn1.x509.Extension
   */
  class BasicConstraints extends Extension {
    constructor(params?: {cA: boolean; pathLen: number});
    getExtnValueHex(): string;
  }
}
