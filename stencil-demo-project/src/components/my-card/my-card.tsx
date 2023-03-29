import { Component, h } from "@stencil/core";


@Component({
    tag: 'my-card',
    styleUrl: 'my-card.css',
    shadow: true
})


export class MyCard {
    render() {
        let reactContent = (
            <div>
                <div class="card-custom" id="react-div">
                    Hello, From React <br></br> Live Users
                    <button class="btn-react small-btn">Get React Users</button><br></br>
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
                <button class="btn-stencil">Stencil</button>
                <button class="btn-react">React</button>
                {reactContent}
                {stencilContent}
            </div>
        )

        return mainContent;
    }
}