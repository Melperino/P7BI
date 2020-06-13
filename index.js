makeItChart1();
makeItChart2();
const x_labels = [];
const y_data = [];
const x_labels_2 = [];
const y_data_2 = [];
    
var abortasion = [];
    d3.csv("abortasion.csv", function(data) {  
    abortasion.push(data);
    });
    
    console.log(abortasion)
    
    var sumCategory = d3.nest()
        .key(function(d) { return d.Period; })
        .key(function(d) { return d.Age; })
    .rollup(function(leaves) {
    return {
    "total": d3.sum(leaves, function(d) { return parseFloat(d.Abortions); })
    } 
    })
    .entries(abortasion);

    console.log(sumCategory);

async function getData() {
    
    const movie_response = await fetch('abortasion.csv');
    const movie_data = await movie_response.text();


    const theWholeThing = movie_data.split('\n').slice(1);
    theWholeThing.forEach(row => {
        const columns = row.split(',');
        const annvs = columns[0];
        const quantita = columns[2];
        const eta = columns[1];
        x_labels.push(quantita);
        y_data.push(annvs);
        y_data_2.push(quantita);
        x_labels_2.push(eta);
    });

}


async function makeItChart1() {
    await getData();
    const ctx = document.getElementById('chart_1').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: x_labels,
            datasets: [{
                label: 'Abortos por año',
                data: y_data,
                backgroundColor:
                    'rgba(19, 57, 159, 0.2)'
                ,
                borderColor:
                    'rgba(19, 99, 132, 1)'
                ,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            tooltips: {

            }

        }
    });
}

async function makeItChart2() {
    await getData();
    const ctx = document.getElementById('chart_2').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: x_labels_2,
            datasets: [{
                label: 'Abortos por rango de edad',
                data: y_data_2,
                backgroundColor:
                    'rgba(19, 57, 159, 0.2)'
                ,
                borderColor:
                    'rgba(19, 99, 132, 1)'
                ,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            tooltips: {

            }

        }
    });
}

