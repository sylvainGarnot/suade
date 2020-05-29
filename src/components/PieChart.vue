<script>
import Charts from "vue-chartjs";

export default {
    extends: Charts.Pie,
    name: "PieChart",
    props: {
        data: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
    mounted() {
        this.renderChart(this.data, this.options);
    }
};
</script>