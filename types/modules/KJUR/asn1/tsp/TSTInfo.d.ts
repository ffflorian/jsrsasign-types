declare namespace jsrsasign.KJUR.asn1.tsp {
  /**
   * class for TSP TSTInfo ASN.1 object
   * @param params associative array of parameters
   * @description
   * ```
   * TSTInfo ::= SEQUENCE  {
   *    version         INTEGER  { v1(1) },
   *    policy          TSAPolicyId,
   *    messageImprint  MessageImprint,
   *    serialNumber    INTEGER, -- up to 160bit
   *    genTime         GeneralizedTime,
   *    accuracy        Accuracy                 OPTIONAL,
   *    ordering        BOOLEAN                  DEFAULT FALSE,
   *    nonce           INTEGER                  OPTIONAL,
   *    tsa             [0] GeneralName          OPTIONAL,
   *    extensions      [1] IMPLICIT Extensions  OPTIONAL   }
   * ```
   * @example
   * o = new KJUR.asn1.tsp.TSTInfo({
   *     policy:    '1.2.3.4.5',
   *     messageImprint: {hashAlg: 'sha256', hashMsgHex: '1abc...'},
   *     genTime:   {withMillis: true},     // OPTION
   *     accuracy:  {micros: 500},          // OPTION
   *     ordering:  true,                   // OPITON
   *     nonce:     {hex: '52fab1...'},     // OPTION
   *     tsa:       {str: '/C=US/O=TSA1'}   // OPITON
   * });
   */
  class TSTInfo extends ASN1Object {
    constructor(params: {
      policy: string;
      messageImprint: any;
      genTime?: StringParam | HexParam | DateParam | string;
      accuracy?: {seconds: number; millis: number; micros: number};
      ordering?: boolean;
      nonce?: IntegerParam | BigIntegerParam | HexParam | number;
      serialNumber?: IntegerParam | BigIntegerParam | HexParam | number;
      tsa?: any;
    });

    getEncodedHex(): string;
  }
}
