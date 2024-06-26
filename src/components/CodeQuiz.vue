<template>
    <div class="max-w-2xl mx-auto p-4">
        <div class="mb-4">
            <h2 class="text-xl font-bold">題目：{{ props.question }}</h2>
        </div>
        <div class="mb-4">
            <div ref="editorContainer" class="border border-gray-300 rounded-md"></div>
        </div>
        <button @click="executeCode"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            執行
        </button>
        <div class="mt-4">
            <h3 class="text-lg font-semibold mb-2">執行結果：</h3>
            <pre class="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">{{ output }}</pre>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

const props = defineProps({
    question: {
        type: String,
        required: true
    },
    insert: {
        required: true
    }
});

const editorContainer = ref(null);
const output = ref('');
let editorView = null;

onMounted(() => {
    const startState = EditorState.create({
        doc: props.insert,
        extensions: [
            keymap.of(defaultKeymap),
            javascript(),
            oneDark,
            EditorView.lineWrapping,
        ]
    });

    editorView = new EditorView({
        state: startState,
        parent: editorContainer.value
    });
});

onBeforeUnmount(() => {
    if (editorView) {
        editorView.destroy();
    }
});

const executeCode = () => {
    const code = editorView.state.doc.toString();
    try {
        const result = eval(code);
        output.value = result !== undefined ? result.toString() : '執行成功，無返回值';
    } catch (error) {
        output.value = `執行錯誤：${error.message}`;
    }
};
</script>
<style>
.cm-editor {
    height: 300px;
    width: 100%;
    padding: 10px;
}

.cm-scroller {
    overflow: auto;
}
</style>