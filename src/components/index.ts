import Vue from 'vue';
import FteInput from "./input/fte-input.vue";
import FteForm from "./form/fte-form.vue";
import Flag from "./fragments/flag.vue";
import FteFile from './input/fte-file.vue';
import 'flag-icon-css/css/flag-icon.css';

const Components: any = {
	"e-input": FteInput,
	"e-form": FteForm,
	"e-flag": Flag,
	"e-file": FteFile
};

Object.keys(Components).forEach((name: string) => {
	Vue.component(name, Components[name])
});

export default Components;
