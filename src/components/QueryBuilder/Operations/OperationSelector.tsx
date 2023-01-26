import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
export default function OperationSelector() {
  return (
    <Menu menuButton={<MenuButton><AddOutlinedIcon
    style={{height:'13px', width:'13px'}}
    />Add Operator</MenuButton>} transition>
    <SubMenu label={'Aggregations'}>
        <MenuItem>
        
        </MenuItem>
    </SubMenu>
    <SubMenu label={'Range Functions'}></SubMenu>
    <SubMenu label={'Formats'}></SubMenu>
    <SubMenu label={'Binary Operations'}></SubMenu>
    <SubMenu label={'Label Filters'}></SubMenu>
    <SubMenu label={'Line Filters'}></SubMenu>
  </Menu>
  )
}
