import { Component, h, Prop } from "@stencil/core";


@Component({
    tag: 'my-card',
    styleUrl: 'my-card.css',
    shadow: true
})


export class MyCard {
 
    @Prop({mutable: true}) name: string

    changeState() {
        this.name = "Krishang";
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
                <h1>Hi, I am {this.name}</h1>
                <button class="btn-stencil">Stencil</button>
                <button class="btn-react">React</button>
                {reactContent}
                {stencilContent}
            </div>
        )

        return mainContent;
    }
}