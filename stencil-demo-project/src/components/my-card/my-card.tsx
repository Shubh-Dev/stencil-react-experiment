import { Component, h, Prop, State, Watch } from "@stencil/core";

// api key
// 3PTP9MLITVHFAHW7


@Component({
    tag: 'my-card',
    styleUrl: 'my-card.css',
    shadow: true
})


export class MyCard {
 
    @Prop({mutable: true}) userName: string;
    // @State() APIData: string;
    @State() showcard: boolean = true;
    @State() showReactTab: boolean = false;
    @State() showStencilTab: boolean = false;

    @State() myStencilUsers: string
    @State() myReactUsers: String


    // changeState() {
    //     this.userName = "Krishang";
    //     // this.APIData = "This data is comeing from API"
    //     this.showcard = !this.showcard
    // }

    onContentChange(content: string) {
        if(content == 'reacttab') {
            this.showReactTab = true;
            this.showStencilTab = false;
        } else if(content == 'stenciltab') {
            this.showReactTab = false;
            this.showStencilTab = true;
        } else {
            this.showReactTab = false;
            this.showStencilTab = false;
        }
    }

    getStencilUsersFromApi() {
        this.myStencilUsers = 'Loading data ...'
        fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo')
        .then((res) => res.json())
        .then((parseRes) => {
            let timeSeries = parseRes['Time Series (5min)']
            let timeDateStencil = timeSeries['2023-03-29 18:20:00']
            this.myStencilUsers =timeDateStencil['1. open']
        })
    }

    getReactUserFromApi() {
        this.myReactUsers = 'Loading ...';
        fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo')
        .then((res) => res.json())
        .then((parseRes) => {
            let timeSeries = parseRes['Time Series (5min)'];
            let timeDataReact = timeSeries['2023-03-29 18:20:00']
            this.myReactUsers = timeDataReact['5. volume']
        })
    }

    fetchDataFromAPI(contentType: string) {
        if(contentType == 'stencil') {
            this.getStencilUsersFromApi();
        } else {
            this.getReactUserFromApi
        }
    }
 
    onUserInput(event: Event) {
        this.userName = (event.target as HTMLInputElement).value
    }

    //  componentWillLoad() {
    //     this.APIData = 'Loading...'
    //     fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo')
    //     .then((res) => res.json())
    //     .then((parsedRes) => {
    //         let metaData = parsedRes['Meta Data']
    //         let timeDateStencil = metaData['1. Information']
    //         this.APIData = timeDateStencil;
    //     })
    // }

    // lifecycle methods

    // when component connects to the dom
    // connectedCallback() {
    //     console.log('connectedcallback')
    // }
    // when component disconnects from the dom
    // disconnectedCallback() {
    //     console.log('disconnectedcallback')
    // }

    // This method is only called once
    // this is a good place to load data asyncronously
    // componentWillLoad() {
    //     console.log('Componentwillload component is about to load')
    // }

    // It is always recomended to make any rendered state updates
    // within componentWillRender()
    // this.APIdata = 'updated'
    // componentWillRender() {
    //     console.log('componentWillRender')
    // }


    // called just once after component fully loaded
    // and the forst render() occurs
    // componentDidLoad() {
    //     console.log('componentdidload')
    // }

    // This hook is called when a Prop or State property changes
    // and a render is about to be requested. If this method return 
    // false the the component will not update anymore.
    // componentShouldUpdate() {
    //     return true;
    // }

    // componentWillUpdate() {
    //     console.log('componentwillupadte')
    // }

    // componentDidUpdate() {
    //     console.log('componentdidupdate')
    // }
  




    @Watch('userName')
    
    watchHadler(newValue: boolean, oldValue: boolean) {
        console.log("The new value of name is " + newValue + " and old value is " + oldValue)
    }

    render() {
        let reactContent = (
             <div>
                <div class="card-custom" id="react-div">
                    Hello, From React <br></br> Live Users <span>{this.myReactUsers}</span>
                    <button class="btn-react small-btn" onClick={this.getReactUserFromApi.bind(this, 'react')} >Get React Users</button><br></br>
                </div>
            </div>
        );
        let stencilContent = (
            <div>
                <div class="card-custom" id="stencil-div">
                    Hello, from Stencil <span>{this.myStencilUsers}</span>
                    <br /> <br />
                    Live Users
                    <button class="btn-stencil small-btn" onClick={this.getStencilUsersFromApi.bind(this, 'stencil')}>Get Stencil Users</button> <br />
                    <br /><br />
                </div>
            </div>
        );


        let mainContent = (
            <div class="may-card-wrapper">
                <h1>Hi, I am {this.userName}</h1>
                {/* <h5>{this.APIData}</h5> */}
                <button class="btn-stencil" onClick={this.onContentChange.bind(this, 'stenciltab')}>Stencil</button>
                <button class="btn-react" onClick={this.onContentChange.bind(this, 'reacttab')}>React</button>
                {this.showReactTab && reactContent}
                {this.showStencilTab && stencilContent}

                <hr />
                <h3>Two way data binding</h3>
                <input type="text" class="my-input-textbox" onInput={this.onUserInput.bind(this)} value={this.userName} />
            </div>
        )

        return mainContent;
    }
}