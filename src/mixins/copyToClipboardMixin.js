export default {
    methods: {
        async copyTextToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                this.setCopied()
            } catch (error) {
                console.error('Failed to copy: ', error);
            }
        }
    }
}