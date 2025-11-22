document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupChartFilters();
    setupAnimations();
});

function initializeCharts() {
    const dailyData = {
        labels: chartData.daily.labels,
        datasets: [{
            label: 'Общие пожертвования',
            data: chartData.daily.data,
            backgroundColor: 'rgba(0, 102, 255, 0.2)',
            borderColor: 'rgba(0, 102, 255, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    };

    const projectsLabelsRaw = chartData.projects?.labels || [];
    const projectsData = chartData.projects?.data || [];
    const projectsLabels = projectsLabelsRaw.map(label => label.length > 20 ? label.substring(0, 20) + '...' : label);

    const colors = [
        'rgba(0, 102, 255, 0.7)',
        'rgba(0, 61, 166, 0.7)',
        'rgba(74, 139, 255, 0.7)',
        'rgba(116, 166, 255, 0.7)',
        'rgba(158, 193, 255, 0.7)',
        'rgba(200, 220, 255, 0.7)',
        'rgba(100, 150, 255, 0.7)'
    ];
    const borderColors = [
        'rgba(0, 102, 255, 1)',
        'rgba(0, 61, 166, 1)',
        'rgba(74, 139, 255, 1)',
        'rgba(116, 166, 255, 1)',
        'rgba(158, 193, 255, 1)',
        'rgba(200, 220, 255, 1)',
        'rgba(100, 150, 255, 1)'
    ];

    const projectsChartData = {
        labels: projectsLabels,
        datasets: [{
            label: 'Собрано средств',
            data: projectsData,
            backgroundColor: projectsLabels.map((_, i) => colors[i % colors.length]),
            borderColor: projectsLabels.map((_, i) => borderColors[i % borderColors.length]),
            borderWidth: 1
        }]
    };

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} ₽`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString() + ' ₽';
                    }
                }
            }
        }
    };

    const dailyCtx = document.getElementById('dailyChart').getContext('2d');
    const dailyChart = new Chart(dailyCtx, {
        type: 'line',
        data: dailyData,
        options: commonOptions
    });

    const projectsCtx = document.getElementById('projectsChart').getContext('2d');
    const projectsChart = new Chart(projectsCtx, {
        type: 'bar',
        data: projectsChartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            const index = context[0].dataIndex;
                            return projectsLabelsRaw[index] || context[0].label;
                        },
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} ₽`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + ' ₽';
                        }
                    }
                }
            }
        }
    });

    const projectsDailyDatasets = [];
    const projectsDailyLabels = chartData.daily.labels || [];
    const projectsDailyData = chartData.projectsDaily || {};
    
    Object.keys(projectsDailyData).forEach((projectName, index) => {
        const shortName = projectName.length > 25 ? projectName.substring(0, 25) + '...' : projectName;
        projectsDailyDatasets.push({
            label: shortName,
            data: projectsDailyData[projectName],
            backgroundColor: colors[index % colors.length].replace('0.7', '0.2'),
            borderColor: borderColors[index % borderColors.length],
            borderWidth: 2,
            tension: 0.4,
            fill: false
        });
    });

    const projectsDailyChartData = {
        labels: projectsDailyLabels,
        datasets: projectsDailyDatasets
    };

    const projectsDailyCtx = document.getElementById('projectsDailyChart').getContext('2d');
    const projectsDailyChart = new Chart(projectsDailyCtx, {
        type: 'line',
        data: projectsDailyChartData,
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                legend: {
                    ...commonOptions.plugins.legend,
                    labels: {
                        generateLabels: function(chart) {
                            const original = Chart.defaults.plugins.legend.labels.generateLabels;
                            const labels = original.call(this, chart);
                            labels.forEach(label => {
                                if (label.text.length > 25) {
                                    label.text = label.text.substring(0, 25) + '...';
                                }
                            });
                            return labels;
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            const fullName = Object.keys(projectsDailyData).find(name => {
                                const shortName = name.length > 25 ? name.substring(0, 25) + '...' : name;
                                return shortName === context.dataset.label;
                            }) || context.dataset.label;
                            return `${fullName}: ${context.parsed.y.toLocaleString()} ₽`;
                        }
                    }
                }
            }
        }
    });

    window.charts = {
        daily: dailyChart,
        projects: projectsChart,
        projectsDaily: projectsDailyChart
    };
}

function setupAnimations() {
    const elements = document.querySelectorAll('.stat-card, .chart-card');

    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';

        setTimeout(() => {
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}