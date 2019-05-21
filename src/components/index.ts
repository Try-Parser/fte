import Vue from 'vue';
import FteInput from "./input/fte-input.vue";

const Components: any = {
	"e-input": FteInput
};

Object.keys(Components).forEach((name: string) => {
	Vue.component(name, Components[name])
});

export default Components;
