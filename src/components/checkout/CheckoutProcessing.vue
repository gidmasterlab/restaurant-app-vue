<template>
    <div class="processing">

        <div class="header">
            <span class="title large">Thanks you for your order !</span>
            <p class="description" v-if="!processed">
                Please wait while we process your payment.
            </p>
            <p class="description" v-if="processed">
                We hope you enjoy you products and we would love to hear your feedback.
            </p>
        </div>

        <div class="success-checkmark" v-if="processed">
            <div class="check-icon">
                <span class="icon-line line-tip"></span>
                <span class="icon-line line-long"></span>
                <div class="icon-circle"></div>
                <div class="icon-fix"></div>
            </div>
        </div>

        <div class="processing-ripple" v-if="!processed">
            <div></div>
            <div></div>
        </div>

        <Button :disabled="!processed" model="standard" @click="finalizeCheckoutClicked">
            Keep browsering
        </Button>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/shared/buttons/Button.vue";

export default defineComponent({
    name: "CheckoutProcessing",
    props: {
        processed: Boolean
    },
    components: {
        Button
    },
    setup(props, { emit }) {

        const finalizeCheckoutClicked = () => {
            emit('finalize-checkout-click');
        }

        return {
            finalizeCheckoutClicked
        }
    }
});
</script>

<style scoped lang="scss">
.processing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: $gap-desktop;
    transition: all 0.2s ease;

    .header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: $gap-text-desktop;

        .title {
            color: $text-primary;
            font-size: 24px;
            text-align: center;
        }

        .description {
            color: $text-secondary;
            text-align: center;
        }
    }

    .success-checkmark {
        width: 80px;
        height: 115px;
        margin: 0 auto;

        .check-icon {
            width: 80px;
            height: 80px;
            position: relative;
            border-radius: 50%;
            box-sizing: content-box;
            border: 4px solid $success;

            &::before {
                top: 3px;
                left: -2px;
                width: 30px;
                transform-origin: 100% 50%;
                border-radius: 100px 0 0 100px;
            }

            &::after {
                top: 0;
                left: 30px;
                width: 60px;
                transform-origin: 0 50%;
                border-radius: 0 100px 100px 0;
                animation: rotate-circle 4.25s ease-in;
            }

            &::before,
            &::after {
                content: "";
                height: 100px;
                position: absolute;
                background-color: $background-primary;
                transform: rotate(-45deg);
            }

            .icon-line {
                height: 5px;
                background-color: $success;
                display: block;
                border-radius: 2px;
                position: absolute;
                z-index: 10;

                &.line-tip {
                    top: 46px;
                    left: 14px;
                    width: 25px;
                    transform: rotate(45deg);
                    animation: icon-line-tip 0.75s;
                }

                &.line-long {
                    top: 38px;
                    right: 8px;
                    width: 47px;
                    transform: rotate(-45deg);
                    animation: icon-line-long 0.75s;
                }
            }

            .icon-circle {
                top: -4px;
                left: -4px;
                z-index: 10;
                width: 80px;
                height: 80px;
                border-radius: 50%;
                position: absolute;
                box-sizing: content-box;
                border: 4px solid rgba(76, 175, 80, 0.5);
            }

            .icon-fix {
                top: 8px;
                width: 5px;
                left: 26px;
                z-index: 1;
                height: 85px;
                position: absolute;
                transform: rotate(-45deg);
                background-color: $background-primary;
            }
        }
    }

    .processing-ripple {
        // display: inline-block;
        position: relative;
        width: 115px;
        height: 115px;
        margin-top: -10px;
        margin-bottom: 10px;

        div {
            position: absolute;
            border: 4px solid $primary-color;
            opacity: 1;
            border-radius: 50%;
            animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

            &:nth-child(2) {
                animation-delay: -0.5s;
            }
        }
    }

    @include mediaQuery($breakpoint-mobile) {
        //
    }

}


@keyframes rotate-circle {
    0% {
        transform: rotate(-45deg);
    }

    5% {
        transform: rotate(-45deg);
    }

    12% {
        transform: rotate(-405deg);
    }

    100% {
        transform: rotate(-405deg);
    }
}

@keyframes icon-line-tip {
    0% {
        width: 0;
        left: 1px;
        top: 19px;
    }

    54% {
        width: 0;
        left: 1px;
        top: 19px;
    }

    70% {
        width: 50px;
        left: -8px;
        top: 37px;
    }

    84% {
        width: 17px;
        left: 21px;
        top: 48px;
    }

    100% {
        width: 25px;
        left: 14px;
        top: 45px;
    }
}

@keyframes icon-line-long {
    0% {
        width: 0;
        right: 46px;
        top: 54px;
    }

    65% {
        width: 0;
        right: 46px;
        top: 54px;
    }

    84% {
        width: 55px;
        right: 0px;
        top: 35px;
    }

    100% {
        width: 47px;
        right: 8px;
        top: 38px;
    }
}

@keyframes lds-ripple {
    0% {
        top: 56px;
        left: 56px;
        width: 0;
        height: 0;
        opacity: 1;
    }

    100% {
        top: 0px;
        left: 0px;
        width: 110px;
        height: 110px;
        opacity: 0;
    }
}
</style>