import axios from 'axios';

const initialState = {
	
};

const state = JSON.parse(JSON.stringify(initialState));

const getters={

};

const mutations={

};

const actions={
	verDeseosFecha({state},[e]){
		this.commit('setUsuarioData', ['amigoFecha',e.id]);
		this.getters.getRouter.navigate('/deseos_fechas_amigos');
	}, 
};

export default {
    state,
    getters,
    mutations,
    actions
};