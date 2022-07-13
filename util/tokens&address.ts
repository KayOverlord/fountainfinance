import ComboAbi from "./Abi/combo-abi.json"
import BnBAbi from "./Abi/bnb-abi.json"
import WethAbi from "./Abi/weth-abi.json"
import GoliAbi from "./Abi/goli-abi.json"
import WMaticAbi from "./Abi/wmatic-abi.json"
import SANDAbi from "./Abi/Sand-abi.json"

export const LP_Tokens =[{
    title:"COMBO",
    address:"0x6DdB31002abC64e1479Fc439692F7eA061e78165",
    Fountain_address:"0x0ab865137ddb23e99447369A0340C7eB92Ad1C0F",
    symbol:"FTN-COMBO",
    image:"https://polygonscan.com/token/images/furucombo_32.png",
    Abi:ComboAbi
},
{
    title:"BNB",
    address:"0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3",
    Fountain_address:"0x7B929E2A8053d7B35DE95068e7a099CE4D02d96a",
    symbol:"FTN-BNB",
    image:"https://polygonscan.com/token/images/bnb_28_2.png",
    Abi:BnBAbi
},
{
    title:"WETH",
    address:"0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    Fountain_address:"0x77B9F288053685D0876387d9b4D8C1A3e2Aa6018",
    symbol:"FTN-WETH",
    image:"https://polygonscan.com/token/images/wETH_32.png",
    Abi:WethAbi
},{
    title:"WMATIC",
    address:"0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    Fountain_address:"0x9EEB47fa2D9b24f136D8BA4e0303Ca95A288481A",
    symbol:"FTN-WMATIC",
    image:"https://polygonscan.com/token/images/wMatic_32.png",
    Abi:WMaticAbi
},
{
    title:"GOLI",
    address:"0x76D589B09dcD4C15Af511DcD42a2764a176365e8",
    Fountain_address:"0x2E39D2AE5b500641D819fF15d2F0141987eDBfDf",
    symbol:"FTN-GOLI",
    image:"https://polygonscan.com/token/images/golinenetwork_32.png",
    Abi:GoliAbi
},
{
    title:"SAND",
    address:"0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683",
    Fountain_address:"0x7A0862e1170E38dd912151eBfdFF8F9242F61D08",
    symbol:"FTN-SAND",
    image:"https://polygonscan.com/token/images/sand_32.png",
    Abi:SANDAbi 
},

]

export const contracts_address={
Archangel:"0xf40388b593efb236d1AB314A6aa969F9487890d8",
AngelFactory:"0x66Ab9f76e7822B7160E22f8b02Dbd2D757FabF32",
Angel:"0x9A4463e514487C597f045Cea84BB4b7D053a3D73",
RewardToken:"0x76D589B09dcD4C15Af511DcD42a2764a176365e8",
FountainFactory:"0xDE7DBC03c90b0C6029F435865Cd92212D0e0cAc3"
}
/**
 * matic
 * combo
 * usdc
 * bnb
 * weth
 * 0x271d70ED8a1ab6890aFaD1D99e64450972D96a18
 * 
 * 
 * Angels
 * 0xD9Ec1613C9E9C41c91C76C46b342B2b8690ba062
 * 0x08Ea69459ccBc465A1aF1F7462173bA35264b149
 * 0x062FfE63b7A0d7f27A8105e717c6Ea45E5848AD3
 * I have a problem In regards to the Trevi system, so after approving and depositing the lp Tokens to the fountain and calling joinAngel(angel address) the execution gets reverted
What am I missing?
 * 
 */