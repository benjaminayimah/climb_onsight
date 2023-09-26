export default {
    data() {
        return {
            showPass: false,
            copied: false
        }
    },
    methods: {
        togglePass() {
            this.showPass = !this.showPass
        },
        generatePass(length) {
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]}|;:,<.>/ ?";
            let pass = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                pass += charset[randomIndex];
            }
            this.form.password = pass
            this.form.new_password = pass
            this.copied ? this.resetCopied() : ''
        },
        async copyTextToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                this.setCopied()
            } catch (error) {
                console.error('Failed to copy: ', error);
            }
        },
        checkCopied() {
            this.copied ? this.resetCopied() : ''
        },
        setCopied() {
            this.copied = true
        },
        resetCopied() {
            this.copied = !this.copied
        },
    }
}