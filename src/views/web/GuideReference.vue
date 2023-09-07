<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">References</div>
        <form>
            <div class="form-wrapper flx column gap-16">
                <div class="form-row column">
                    <label for="referenceName">Referees name</label>
                    <div class="input-wrapper">
                        <input type="text" name="referenceName" id="referenceName" class="form-control" placeholder="Referees name">
                    </div>
                </div>
                <div class="form-row column">
                    <label for="email">Email</label>
                    <div class="input-wrapper">
                        <input type="email" name="email" id="email" class="form-control" placeholder="Email">
                    </div>
                </div>
                <div class="form-row column">
                    <label for="phone">Phone</label>
                    <div class="input-wrapper">
                        <input type="tel" name="phone" id="phone" class="form-control" placeholder="Phone number">
                    </div>
                </div>
                <a href="" class="a-button button-outline btn-lg gap-8">
                    <i class="br-50 centered">
                        <svg xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 11.521 11.521">
                            <path  d="M19.678,26.263V21.326H14.74V19.68h4.938V14.742h1.646V19.68h4.938v1.646H21.324v4.938Z" transform="translate(-14.74 -14.742)" fill="#fff"/>
                        </svg>
                    </i>
                    Add more references
                </a>
                <button class="button-primary gap-8 w-100 btn-lg ai-c">
                    <span>Finish</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'GuideReference'
}
</script>

<style lang="scss" scoped>
.button-outline {
    i {
        height: 30px;
        width: 30px;
        background-color: #000;
    }
}
</style>