import Vue from 'vue';
import input from "./input/fte-input.vue";

const Components = {
	"e-input": input
};

Object.keys(Components).forEach(name => {
	Vue.component(name, Components[name])
});

export default Components;
