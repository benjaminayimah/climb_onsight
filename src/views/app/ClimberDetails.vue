<template>
    <div class="br-16 bg-white main-details-wrapper flx column gap-16" v-if="user.name">
        <div class="text-center relative">
            <h4>Climber Details</h4>
            <button class="button-danger absolute btn-rounded btn-sm">Delete Climber</button>
        </div>
        <img class="br-8 profile-img" :src="user.image" :alt="user.name">
        <div class="flx jc-sb ai-c">
            <h3>{{ user.name }}</h3>
            <div class="pill pill-neutral">234 Completed Events</div>
        </div>
        <div class="flx jc-sb ai-c">
            <div>
                <label for="interest">Interest</label>
                <div id="interest">Mountain climbing</div>
            </div>
            <div>
                <button  class="pill pill-black">See All Events</button>
            </div>
        </div>
        <div>
            <label for="bio">Guide Bio</label>
            <div id="bio">
                Lorem ipsum dolor sit amet consectetur. Molestie erat vel suscipit lacinia vulputate. Viverra pulvinar sed nibh facilisi nisl mattis neque aliquam volutpat. Malesuada lacinia justo nisi et laoreet ac leo eget auctor. Eget elit nunc sit nam. In tellus laoreet nibh vestibulum.
            </div>
        </div>
        <div>
            <label for="experience">Experiences</label>
            <div id="experience">
                <div><span>6 years experience</span> in ice climbing</div>
                <div><span>2 years experience</span> in mountain climbing</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ClimberDetails',
    props: {
        user: Object
    }
}
</script>

<style lang="scss" scoped>

</style>