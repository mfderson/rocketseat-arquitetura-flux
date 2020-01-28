import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';

import { addToCartSuccess } from './actions';

// Essa declaração de função com * quer dizer que vamos usar o generator, que é
// uma funcionalidade do javascript
// Equivalente a async function...Porém o generator é mais potente
function* addToCart({ id }) {
  // O yield funciona como o await
  const response = yield call(api.get, `/products/${id}`);

  // Dispara uma action para o redux
  yield put(addToCartSuccess(response.data));
}

// Faz o bind de qual action quer ouvir para qual função quer disparar
// O takeLatest inibe vários clicks do usuário até que o yield seja executado
export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
