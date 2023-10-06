<template>
    <li @click.prevent="$emit('do-check', access.id)" class="relative" :class="{ 'active': access.status }">
        <i class="absolute centered br-50">
            <svg xmlns="http://www.w3.org/2000/svg"  height="8" viewBox="0 0 18.788 14.586">
                <path d="M3710.728,693.174a1.2,1.2,0,0,1-.838-.341l-6.174-6.019a1.2,1.2,0,0,1,1.675-1.718l5.248,5.116,9.383-11.194a1.2,1.2,0,0,1,1.839,1.542l-10.214,12.186a1.2,1.2,0,0,1-.859.428Z" transform="translate(-3703.354 -678.589)"/>
            </svg>
        </i>
        <a href="#" @click.prevent="" class="br-16 capitalize">
            <span>{{ access.name }},</span>
            <abbr class="uppercase" :title="access.name"><strong>{{ access.abbr }}</strong></abbr>
        </a>
    </li>
</template>
<script>
export default {
    name: 'AccessList',
    props: ['access']
}
</script>
<style lang="scss" scoped>
li {
    a {
        padding: 16px 24px;
        display: block;
        border: 1px solid rgba(15, 41, 77, 0.1);
        transition: var(--input-btn-transition);
    }
    &:hover {
        a {
            box-shadow: rgba(15, 41, 77, 0.08) 0px 8px 16px 0px;
        }
        svg {
            transition: inherit;
        }
        path {
            fill: var(--primary-color);
        }
    }
}
i {
    height: 22px;
    width: 22px;
    background-color: #f6f7f9;
    inset: -5px -5px auto auto;
    cursor: pointer;
    path {
        fill: rgba(15, 41, 77, 0.08);
    }
}
.active{
    i {
        background-color: var(--primary-color);
        path {
            fill: #fff;
        }
    }
    a {
        border-color: #000;
    }
}
abbr{
    margin-left: 4px;
}
</style>