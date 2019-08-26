import echarts from 'echarts';
// import echarts from 'echarts/lib/echarts';
// import 'echarts/lib/chart/graph';
import EchartsReactCore from 'echarts-for-react/lib/core';

// export the Component the echarts Object.
export default class EchartGraphReact extends EchartsReactCore {
    constructor(props) {
        super(props);
        this.echartsLib = echarts;
    }
}