<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { computed } from 'vue';

const model = defineModel<number>({required: true})

const game = useGameStore()

const avail_problems = computed(() => 
    game.match_info?.info.questionId.slice(0, game.match_info.info.currentQuestion + 1)
)
</script>

<template>
    <!--TESTING PURPOSE<button @click="game.match_info!.info.currentQuestion++">add</button>-->
    <ol class="steps">
        <template v-for="problem_id, index of game.match_info?.info.questionId">
            <li :class="[`step${index+1}`,
                         model == index ? 'current' : undefined,
                         game.match_info!.info.currentQuestion < index ? 'remove' : undefined]"
                @click="model = index">
                <span>{{ problem_id }}</span>
            </li>
        </template>
    </ol>
</template>

<style scoped lang="scss">
ol.steps {
    width: 100%;
    display: flex;

    $line_height: 20px;
    $padding: 9px;
    $arrow_size: ($line_height + 2 * $padding)/2;
    $max_li: 10;
    
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', 'DejaVu Sans', 'Bitstream Vera Sans', 'Liberation Sans', Verdana, 'Verdana Ref', sans-serif;
    font-size: 13px;
    line-height: $line_height;
    font-weight: bold;
    counter-reset: li;
    
    li {
        list-style-image: none;
        list-style-type: none;
        margin-left: 0;
        text-align: center;
        color: #3a3a3a;
        background: #dae4eb;
        position: relative;
        margin-left: 5px + 2 * $arrow_size;
        user-select: none;

        flex: 1;
        transition: flex 1s;
        
        display: flex;
        align-items: center;
        justify-content: center;

        // Appended arrow.
        &:after {
            position: absolute;
            top: 50%;
            left: 100%;
            content: " ";
            height: 0;
            width: 0;
            pointer-events: none;
            border: solid transparent;
            border-left-color: #dae4eb;
            border-width: $arrow_size;
            margin-top: -$arrow_size;
        }
    
        // No prepended arrow on first item.
        &:first-child {
            margin-left: 0;
            span {
                padding: $padding ($padding + 9px);
                &:after {
                    border: none;
                }
            }
        }

        // No appended arrow on last item.
        &:last-child {
            &:after {
                border-width: 0;
            }
        }

        span {
            width: 0;
            transition: padding 1s;

            overflow: hidden;

            display: flex;
            align-items: center;
            justify-content: center;
            padding: $padding ($padding + $arrow_size + 9px) $padding ($padding + 9px);

            // Prepended arrow inset.
            &:after {
                position: absolute;
                top: 50%;
                right: 100%;
                content: " ";
                height: 0;
                width: 0;
                pointer-events: none;
                border: solid #dae4eb;
                border-left-color: transparent;
                border-width: $arrow_size;
                margin-top: -$arrow_size;
            }
            
            // "X)" numbering
            &:before {
                content: counter(li) ") ";
                counter-increment: li;

                margin-right: 0.25rem;
            }
        }
    }

    li.remove {
        flex: 0;
        span {
            width: 0;
            padding-left: 0;
            padding-right: 0;
        }
    }

    & > li {
        float: left;
    }
    
    li.current {
        color: #fff;
        background: #7b7b7b;

        // Appended arrow.
        &:after {
          border-left-color: #7b7b7b;
        }
                
        span {
            // Prepended arrow.
            &:after {
                border-color: #7b7b7b;
                border-left-color: transparent;
            }
        }
    }

    // For the overlapping to work, later LIs must have a lower z-index.
    @for $i from 1 through $max_li {
        li.step#{$i} {
            z-index: $max_li - $i;
        }
    }
}
</style>