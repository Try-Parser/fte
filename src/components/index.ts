import Vue from 'vue';
import FteInput from "./input/fte-input.vue";
import FteForm from "./form/fte-form.vue";

const Components: any = {
	"e-input": FteInput,
	"e-form": FteForm
};

Object.keys(Components).forEach((name: string) => {
	Vue.component(name, Components[name])
});

export default Components;
