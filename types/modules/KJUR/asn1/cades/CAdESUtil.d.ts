declare namespace jsrsasign.KJUR.asn1.cades {
  namespace CAdESUtil {
    /**
     * parse CMS SignedData to add unsigned attributes
     * @memberOf KJUR.asn1.cades.CAdESUtil
     * @param hex hexadecimal string of ContentInfo of CMS SignedData
     * @return associative array of parsed data
     * @description
     * This method will parse a hexadecimal string of
     * ContentInfo with CMS SignedData to add a attribute
     * to unsigned attributes field in a signerInfo field.
     * Parsed result will be an associative array which has
     * following properties:
     * <ul>
     * <li>version - hex of CMSVersion ASN.1 TLV</li>
     * <li>algs - hex of DigestAlgorithms ASN.1 TLV</li>
     * <li>encapcontent - hex of EncapContentInfo ASN.1 TLV</li>
     * <li>certs - hex of Certificates ASN.1 TLV</li>
     * <li>revs - hex of RevocationInfoChoices ASN.1 TLV</li>
     * <li>si[] - array of SignerInfo properties</li>
     * <li>obj - parsed KJUR.asn1.cms.SignedData object</li>
     * </ul>
     * @example
     * info = KJUR.asn1.cades.CAdESUtil.parseSignedDataForAddingUnsigned(beshex);
     * sd = info.obj;
     */
    function parseSignedDataForAddingUnsigned(hex: string): {
      version: string;
      algs: string;
      certs: string;
      revs: string;
      si: cms.SignerInfo[];
      obj: cms.SignedData;
    };

    /**
     * parse SignerInfo to add unsigned attributes
     * @memberOf KJUR.asn1.cades.CAdESUtil
     * @param hex hexadecimal string of SignerInfo
     * @return associative array of parsed data
     * @description
     * This method will parse a hexadecimal string of
     * SignerInfo to add a attribute
     * to unsigned attributes field in a signerInfo field.
     * Parsed result will be an associative array which has
     * following properties:
     * <ul>
     * <li>version - hex TLV of version</li>
     * <li>si - hex TLV of SignerIdentifier</li>
     * <li>digalg - hex TLV of DigestAlgorithm</li>
     * <li>sattrs - hex TLV of SignedAttributes</li>
     * <li>sigalg - hex TLV of SignatureAlgorithm</li>
     * <li>sig - hex TLV of signature</li>
     * <li>sigval = hex V of signature</li>
     * <li>obj - parsed KJUR.asn1.cms.SignerInfo object</li>
     * </ul>
     * NOTE: Parsing of unsigned attributes will be provided in the
     * future version. That's way this version provides support
     * for CAdES-T and not for CAdES-C.
     */
    function parseSignerInfoForAddingUnsigned(hex: string, iSI: number, nth: number): {
      version: string;
      si: string;
      digalg: string;
      sattrs: string;
      sigalg: string;
      sigval: string;
      obj: cms.SignerInfo
    };
  }
}
