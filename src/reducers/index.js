import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { articleList } from './articleList.reducer';
import { articleDetail } from './articleDetail.reducer';
import { editArticle } from './editArticle.reducer';
import { articleImage } from './articleImage.reducer';
import { pager } from './pager.reducer';
import { getUser } from './getUser.reducer';
import { getUserDetails } from './getUserDetails.reducer';
import { nodeAdd } from './nodeAdd.reducer';
import { addFile } from './addFile.reducer';
import { contact } from './contact.reducer';

const rootReducer =  combineReducers({
  authentication,
  registration,
  articleList,
  articleDetail,
  articleImage,
  editArticle,
  pager,
  getUser,
  getUserDetails,
  nodeAdd,
  addFile,
  contact
});

export default rootReducer
