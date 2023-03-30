import { Component, Prop, h, State } from "@stencil/core";

@Component({
    tag: 'search-world',
    styleUrl: 'search-world.css',
    shadow: true
})

export class SearchWorld {

    @Prop({mutable: true}) searchText: string;
    @State() searchResult: { name: string; marketOpen: string } [] = [];
    @State() userInput: string

    searchFromAPI() {
        fetch('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + this.searchText + '&apikey=3PTP9MLITVHFAHW7')
        .then((res) => res.json())
        .then((parsedRes) => {
            let metaData =parsedRes['bestMatches']
            this.searchResult = metaData.map((data) => {
                
                return {name: data['2. name'],
                marketOpen: data['5. marketOpen']
              }
            })
            console.log(this.searchResult)
            
        })
    }

    onUserInput(event: Event) {
        this.userInput = (event.target as HTMLInputElement).value
        this.searchText = this.userInput

    }

    render() {
        return (
            <div class="main-search-div">
        <input class="my-input-textbox" type="text" value={this.searchText} onInput={this.onUserInput.bind(this)}></input>
        <button class="btn-react" onClick={this.searchFromAPI.bind(this)}>
          Search it!
        </button>
        <hr></hr>
        <br></br> <br></br>
        
        <table id="api-table">
          {this.searchResult.map(r => (
            <tr>
              <td>{r.name}</td>
              <td>{r.marketOpen}</td>
            </tr>
          ))}
        </table>
      </div>
        )
    }

}