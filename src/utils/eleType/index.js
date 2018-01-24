
import { Input, Radio, Checkbox } from 'antd';
import cityData from "components/customer/list/container/citydata";
import Industry from "components/customer/list/container/industry";
import CuperiorCustomer from "components/customer/list/container/superiorCustomer";
import IcbcInfo from "components/customer/list/container/icbcInfo";
import FormMap from "components/customer/list/container/formMap";
import UploadImg from "components/customer/list/container/uploadImg";
import CityChioce from "components/customer/list/container/cityChioce";
import OwnUser from 'components/customer/list/container/ownUser';

const { TextArea } = Input;
let Integer, 
    Decimal,
    MultiSelect,
    Image,
    Currency,
    Date,
    DateTime,
    Tel,
    Email,
    URL,
    GeoLocation,
    Lookup,
    MasterDetail,
    Percent,
    RichText,
    DocRadio,
    DocMultiSelect,
    Enum;

const eleType = {
    1: Input,
    2: Radio,
    3: TextArea,
    4: Checkbox, 
    22: Industry,
    23: CuperiorCustomer,
    24: IcbcInfo,
    25: FormMap,
    26: UploadImg,
    27: CityChioce,
    28: OwnUser,
    29:Enum,
}
export default eleType;

/* 
 5: Integer,
    6: Decimal,
    7: MultiSelect,
    8: Image,
    9: Currency,
    10: Date,
    11: DateTime,
    12: Tel,
    13: Email,
    14: URL,
    15: GeoLocation,
    16: Lookup,
    17: MasterDetail,
    18: Percent,
    19: RichText,
    20: DocRadio,
    21: DocMultiSelect,
*/