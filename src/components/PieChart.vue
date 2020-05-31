<script>
import { Pie, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
    extends: Pie,
    name: "PieChart",
    mixins: [reactiveProp],
    props: {
        chartData: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options);
    },
};
</script>

<style lang="scss" scoped>
canvas {
    padding: 15px;
    border-radius: 5px;
    background: #111;
}
</style>