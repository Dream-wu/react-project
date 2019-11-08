import Home from '../components/Home';
import * as actions from '../store/action';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';
import { Dispatch} from 'redux';
import {logout} from '../http/api';

const handleClick = () => {
  logout().then(res => {
    console.log('结果：',res);
  }).catch(err => {
    console.log('err:', err)
  });
}
export function mapStateToProps({ userName }: StoreState) {
  return {
    userName,
    handleClick
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    handleSave: (userName: string) => dispatch(actions.saveUserInfo(userName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
