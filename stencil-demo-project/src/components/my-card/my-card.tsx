import { Component, h, Prop, State, Watch } from "@stencil/core";


@Component({
    tag: 'my-card',
    styleUrl: 'my-card.css',
    shadow: true
})


export class MyCard {
 
    @Prop({mutable: true}) userName: string;
    @State() APIData: string;
    @State() showcard: boolean = true;
    @State() showReactTab: boolean = false;
    @State() showStencilTab: boolean = false;


    changeState() {
        this.userName = "Krishang";
        this.APIData = "This data is comeing from API"
        this.showcard = !this.showcard
    }

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

    @Watch('userName')
    
    watchHadler(newValue: boolean, oldValue: boolean) {
        console.log("The new value of name is " + newValue + " and old value is " + oldValue)
    }

    componentWillUpdate() {
     console.log("componentWillUpdate")
    }

    render() {
        let reactContent = (
             <div>
                <div class="card-custom" id="react-div">
                    Hello, From React <br></br> Live Users
                    <button class="btn-react small-btn" onClick={this.changeState.bind(this)}>Get React Users</button><br></br>
                </div>
            </div>
        );
        let stencilContent = (
            <div>
                <div class="card-custom" id="stencil-div">
                    Hello, from Stencil
                    <br /> <br />
                    Live Users
                    <button class="btn-stencil small-btn">Get Stencil Users</button> <br />
                    <br /><br />
                </div>
            </div>
        );
        let mainContent = (
            <div class="may-card-wrapper">
                <h1>Hi, I am {this.userName}</h1>
                <h5>{this.APIData}</h5>
                <button class="btn-stencil" onClick={this.onContentChange.bind(this, 'stenciltab')}>Stencil</button>
                <button class="btn-react" onClick={this.onContentChange.bind(this, 'reacttab')}>React</button>
                {this.showReactTab && reactContent}
                {this.showStencilTab && stencilContent}
            </div>
        )

        return mainContent;
    }
}