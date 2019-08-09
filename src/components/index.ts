import Vue from 'vue';

import 'flag-icon-css/css/flag-icon.css';

const Components: any = {
	"e-input": () => import('@/input/fte-input.vue'),
	"e-form": () => import('@/form/fte-form.vue'),
	"e-flag": () => import('@/fragments/flag.vue'),
	"e-file": () => import('@/input/fte-file.vue')
};

Object.keys(Components).forEach((name: string) => {
	Vue.component(name, Components[name])
});

export default Components;
