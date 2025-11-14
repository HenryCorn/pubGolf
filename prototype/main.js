// Pub Golf Tournament Data
const tournamentData = {
    pubs: [
        { id: 'lamb-flag', name: 'Lamb & Flag', drink: 'Pint (Cider/Beer)', par: 4, challenge: 'Secret Santa' },
        { id: 'kings-arms', name: 'Kings Arms', drink: 'Guinness', par: 5, challenge: 'Split the G' },
        { id: 'wig-pen', name: 'Wig & Pen', drink: 'Cerveza Victoria', par: 3, challenge: 'Spotify Wrapped' },
        { id: 'crown', name: 'The Crown', drink: 'Mixer', par: 2, challenge: 'Is it Safe with Alcohol?' },
        { id: 'chequers', name: 'The Chequers', drink: 'IPA', par: 4, challenge: 'XMAS Tradition Quiz' },
        { id: 'whetseaf', name: 'Whetseaf Yard', drink: 'Tequila Mixer', par: 1, challenge: '12 Shots of XMAS' },
        { id: 'staldates', name: 'St Aldates Tavern', drink: 'Fireball Shots', par: 1, challenge: 'Boxing Day Paint' }
    ],
    players: [
        { 
            id: 1, 
            name: 'Sarah "The Eagle" Johnson', 
            avatar: '👩‍🦰',
            scores: {
                'lamb-flag': { sips: 3, penalties: 0, bonuses: 2, total: 1 },
                'kings-arms': { sips: 4, penalties: 1, bonuses: 3, total: 2 },
                'wig-pen': { sips: 2, penalties: 0, bonuses: 0, total: 2 }
            },
            totalScore: 5
        },
        { 
            id: 2, 
            name: 'Mike "Hole-in-One" Chen', 
            avatar: '👨‍💼',
            scores: {
                'lamb-flag': { sips: 4, penalties: 1, bonuses: 0, total: 5 },
                'kings-arms': { sips: 3, penalties: 0, bonuses: 2, total: 1 },
                'wig-pen': { sips: 3, penalties: 0, bonuses: 1, total: 2 }
            },
            totalScore: 8
        },
        { 
            id: 3, 
            name: 'Emma "The Birdie" Williams', 
            avatar: '👩‍🎨',
            scores: {
                'lamb-flag': { sips: 5, penalties: 2, bonuses: 1, total: 6 },
                'kings-arms': { sips: 5, penalties: 0, bonuses: 0, total: 5 },
                'wig-pen': { sips: 1, penalties: 0, bonuses: 3, total: -2 }
            },
            totalScore: 9
        },
        { 
            id: 4, 
            name: 'Tom "The Bogey" Smith', 
            avatar: '👨‍🎓',
            scores: {
                'lamb-flag': { sips: 6, penalties: 1, bonuses: 0, total: 7 },
                'kings-arms': { sips: 6, penalties: 2, bonuses: 1, total: 7 },
                'wig-pen': { sips: 4, penalties: 0, bonuses: 0, total: 4 }
            },
            totalScore: 18
        },
        { 
            id: 5, 
            name: 'Lucy "The Ace" Brown', 
            avatar: '👩‍🍳',
            scores: {
                'lamb-flag': { sips: 2, penalties: 0, bonuses: 3, total: -1 },
                'kings-arms': { sips: 4, penalties: 0, bonuses: 2, total: 2 },
                'wig-pen': { sips: 2, penalties: 1, bonuses: 1, total: 2 }
            },
            totalScore: 3
        },
        { 
            id: 6, 
            name: 'James "The Driver" Davis', 
            avatar: '👨‍🏫',
            scores: {
                'lamb-flag': { sips: 5, penalties: 1, bonuses: 0, total: 6 },
                'kings-arms': { sips: 3, penalties: 0, bonuses: 0, total: 3 },
                'wig-pen': { sips: 3, penalties: 2, bonuses: 0, total: 5 }
            },
            totalScore: 14
        }
    ],
    currentPub: 'wig-pen'
};

// Application State
let currentFilter = 'all';
let chartType = 'bar';
let chart = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeLeaderboard();
    initializePubFilters();
    initializeChart();
    initializeModal();
    startLiveUpdates();
    initializeAnimations();
});

// Leaderboard Functions
function initializeLeaderboard() {
    renderLeaderboard();
}

function renderLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    const sortedPlayers = [...tournamentData.players].sort((a, b) => a.totalScore - b.totalScore);
    
    leaderboard.innerHTML = sortedPlayers.map((player, index) => {
        const position = index + 1;
        const positionClass = position <= 3 ? 'text-amber' : 'text-gray-600';
        const scoreColor = player.totalScore < 10 ? 'text-green-600' : 
                          player.totalScore < 20 ? 'text-amber' : 'text-red-600';
        
        return `
            <div class="score-card glass rounded-xl p-4 cursor-pointer" data-player-id="${player.id}">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="text-2xl font-bold ${positionClass} w-8">
                            ${position}
                        </div>
                        <div class="text-2xl">${player.avatar}</div>
                        <div>
                            <h4 class="font-semibold text-lg">${player.name}</h4>
                            <p class="text-sm text-gray-600">Current Score: <span class="${scoreColor} font-bold">${player.totalScore}</span></p>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-sm text-gray-600">Holes Played</div>
                        <div class="font-bold text-lg">${Object.keys(player.scores).length}/9</div>
                    </div>
                </div>
                
                ${currentFilter !== 'all' ? renderPlayerScoresForPub(player) : ''}
            </div>
        `;
    }).join('');
    
    // Add click listeners for player details
    document.querySelectorAll('.score-card').forEach(card => {
        card.addEventListener('click', function() {
            const playerId = parseInt(this.dataset.playerId);
            showPlayerModal(playerId);
        });
    });
}

function renderPlayerScoresForPub(player) {
    const pubData = player.scores[currentFilter];
    if (!pubData) return '';
    
    return `
        <div class="mt-3 pt-3 border-t border-white/20">
            <div class="grid grid-cols-4 gap-4 text-center text-sm">
                <div>
                    <div class="text-gray-600">Sips</div>
                    <div class="font-bold">${pubData.sips}</div>
                </div>
                <div>
                    <div class="text-gray-600">Penalties</div>
                    <div class="font-bold text-red-600">+${pubData.penalties}</div>
                </div>
                <div>
                    <div class="text-gray-600">Bonuses</div>
                    <div class="font-bold text-green-600">-${pubData.bonuses}</div>
                </div>
                <div>
                    <div class="text-gray-600">Hole Score</div>
                    <div class="font-bold ${pubData.total <= 0 ? 'text-green-600' : 'text-amber'}">${pubData.total}</div>
                </div>
            </div>
        </div>
    `;
}

// Pub Filter Functions
function initializePubFilters() {
    const filterButtons = document.querySelectorAll('.pub-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current filter
            currentFilter = this.dataset.pub;
            
            // Re-render leaderboard and chart
            renderLeaderboard();
            updateChart();
            
            // Animate filter change
            anime({
                targets: '#leaderboard .score-card',
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 600,
                delay: anime.stagger(100),
                easing: 'easeOutQuart'
            });
        });
    });
}

// Chart Functions
function initializeChart() {
    const chartContainer = document.getElementById('chart-container');
    chart = echarts.init(chartContainer);
    
    // Chart toggle buttons
    document.getElementById('bar-chart-btn').addEventListener('click', () => switchChart('bar'));
    document.getElementById('line-chart-btn').addEventListener('click', () => switchChart('line'));
    
    updateChart();
}

function switchChart(type) {
    chartType = type;
    
    // Update button states
    document.getElementById('bar-chart-btn').className = type === 'bar' ? 
        'px-4 py-2 rounded-lg bg-amber text-white text-sm font-medium transition-all' :
        'px-4 py-2 rounded-lg glass text-sm font-medium transition-all';
    
    document.getElementById('line-chart-btn').className = type === 'line' ? 
        'px-4 py-2 rounded-lg bg-amber text-white text-sm font-medium transition-all' :
        'px-4 py-2 rounded-lg glass text-sm font-medium transition-all';
    
    updateChart();
}

function updateChart() {
    const players = tournamentData.players;
    const pubs = currentFilter === 'all' ? tournamentData.pubs : 
                 tournamentData.pubs.filter(pub => pub.id === currentFilter);
    
    let option;
    
    if (chartType === 'bar') {
        option = getBarChartOption(players, pubs);
    } else {
        option = getLineChartOption(players, pubs);
    }
    
    chart.setOption(option, true);
    
    // Animate chart update
    anime({
        targets: '#chart-container',
        scale: [0.95, 1],
        opacity: [0.7, 1],
        duration: 500,
        easing: 'easeOutQuart'
    });
}

function getBarChartOption(players, pubs) {
    const series = players.map(player => ({
        name: player.name.split(' ')[1], // Use last name for brevity
        type: 'bar',
        data: pubs.map(pub => {
            const score = player.scores[pub.id];
            return score ? score.total : 0;
        }),
        itemStyle: {
            borderRadius: [4, 4, 0, 0]
        }
    }));
    
    return {
        title: {
            text: currentFilter === 'all' ? 'Tournament Performance' : `${pubs[0].name} Performance`,
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#2D3748'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#F77F00',
            textStyle: {
                color: '#2D3748'
            }
        },
        legend: {
            bottom: 10,
            textStyle: {
                color: '#2D3748'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: pubs.map(pub => pub.name.split(' ')[0]), // Shortened names
            axisLabel: {
                color: '#2D3748',
                rotate: currentFilter === 'all' ? 45 : 0
            }
        },
        yAxis: {
            type: 'value',
            name: 'Score',
            nameTextStyle: {
                color: '#2D3748'
            },
            axisLabel: {
                color: '#2D3748'
            }
        },
        series: series,
        color: ['#1B4332', '#F77F00', '#FFD700', '#2D5A3D', '#8B4513', '#4682B4']
    };
}

function getLineChartOption(players, pubs) {
    const series = players.map(player => ({
        name: player.name.split(' ')[1],
        type: 'line',
        data: pubs.map(pub => {
            const score = player.scores[pub.id];
            return score ? score.total : 0;
        }),
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
            width: 3
        }
    }));
    
    return {
        title: {
            text: currentFilter === 'all' ? 'Performance Trends' : `${pubs[0].name} Trend`,
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#2D3748'
            }
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#F77F00',
            textStyle: {
                color: '#2D3748'
            }
        },
        legend: {
            bottom: 10,
            textStyle: {
                color: '#2D3748'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: pubs.map(pub => pub.name.split(' ')[0]),
            axisLabel: {
                color: '#2D3748',
                rotate: currentFilter === 'all' ? 45 : 0
            }
        },
        yAxis: {
            type: 'value',
            name: 'Score',
            nameTextStyle: {
                color: '#2D3748'
            },
            axisLabel: {
                color: '#2D3748'
            }
        },
        series: series,
        color: ['#1B4332', '#F77F00', '#FFD700', '#2D5A3D', '#8B4513', '#4682B4']
    };
}

// Modal Functions
function initializeModal() {
    const modal = document.getElementById('player-modal');
    const closeBtn = document.getElementById('close-modal');
    
    closeBtn.addEventListener('click', hidePlayerModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hidePlayerModal();
        }
    });
}

function showPlayerModal(playerId) {
    const player = tournamentData.players.find(p => p.id === playerId);
    if (!player) return;
    
    const modal = document.getElementById('player-modal');
    const modalName = document.getElementById('modal-player-name');
    const modalContent = document.getElementById('modal-content');
    
    modalName.textContent = player.name;
    
    // Generate detailed performance breakdown
    const pubsPlayed = Object.keys(player.scores);
    const modalHTML = `
        <div class="text-center mb-6">
            <div class="text-6xl mb-2">${player.avatar}</div>
            <div class="text-3xl font-bold text-amber">${player.totalScore}</div>
            <div class="text-sm text-gray-600">Total Score</div>
        </div>
        
        <div class="space-y-4">
            <h4 class="font-semibold text-lg">Performance by Pub</h4>
            ${pubsPlayed.map(pubId => {
                const pub = tournamentData.pubs.find(p => p.id === pubId);
                const score = player.scores[pubId];
                const scoreColor = score.total <= 0 ? 'text-green-600' : 'text-amber';
                
                return `
                    <div class="glass rounded-lg p-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-semibold">${pub.name}</span>
                            <span class="font-bold ${scoreColor}">${score.total}</span>
                        </div>
                        <div class="grid grid-cols-3 gap-4 text-sm text-center">
                            <div>
                                <div class="text-gray-600">Sips</div>
                                <div class="font-bold">${score.sips}</div>
                            </div>
                            <div>
                                <div class="text-gray-600">Penalties</div>
                                <div class="font-bold text-red-600">+${score.penalties}</div>
                            </div>
                            <div>
                                <div class="text-gray-600">Bonuses</div>
                                <div class="font-bold text-green-600">-${score.bonuses}</div>
                            </div>
                        </div>
                        <div class="text-xs text-gray-500 mt-2">${pub.challenge} - ${pub.drink}</div>
                    </div>
                `;
            }).join('')}
        </div>
        
        <div class="mt-6 text-center">
            <div class="text-sm text-gray-600">Holes Completed</div>
            <div class="text-2xl font-bold text-amber">${pubsPlayed.length}/9</div>
        </div>
    `;
    
    modalContent.innerHTML = modalHTML;
    modal.classList.remove('hidden');
    
    // Animate modal appearance
    anime({
        targets: modal.querySelector('.glass'),
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutQuart'
    });
}

function hidePlayerModal() {
    const modal = document.getElementById('player-modal');
    
    anime({
        targets: modal.querySelector('.glass'),
        scale: [1, 0.8],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuart',
        complete: () => {
            modal.classList.add('hidden');
        }
    });
}

// Live Updates Simulation
function startLiveUpdates() {
    // Simulate real-time updates every 10 seconds
    setInterval(() => {
        simulateScoreUpdate();
    }, 10000);
}

function simulateScoreUpdate() {
    // Randomly update a player's score
    const randomPlayer = tournamentData.players[Math.floor(Math.random() * tournamentData.players.length)];
    const currentPub = tournamentData.currentPub;
    
    if (!randomPlayer.scores[currentPub]) {
        randomPlayer.scores[currentPub] = { sips: 0, penalties: 0, bonuses: 0, total: 0 };
    }
    
    // Random changes
    const changes = ['sips', 'penalties', 'bonuses'];
    const changeType = changes[Math.floor(Math.random() * changes.length)];
    const changeValue = Math.floor(Math.random() * 2) + 1; // 1 or 2
    
    randomPlayer.scores[currentPub][changeType] += changeValue;
    
    // Recalculate total for the hole
    const score = randomPlayer.scores[currentPub];
    score.total = score.sips + score.penalties - score.bonuses;
    
    // Recalculate total score
    randomPlayer.totalScore = Object.values(randomPlayer.scores).reduce((sum, s) => sum + s.total, 0);
    
    // Update UI with animation
    renderLeaderboard();
    updateChart();
    
    // Show update notification
    showUpdateNotification(randomPlayer.name, changeType, changeValue);
}

function showUpdateNotification(playerName, changeType, changeValue) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 glass rounded-lg p-4 z-50';
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <div class="live-indicator w-3 h-3 bg-red-500 rounded-full"></div>
            <div>
                <div class="font-semibold text-sm">Score Update</div>
                <div class="text-xs text-gray-600">${playerName} - ${changeType} +${changeValue}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate notification
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutQuart'
    });
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 400,
            easing: 'easeInQuart',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// Animation Functions
function initializeAnimations() {
    // Animate hero section on load
    anime.timeline()
        .add({
            targets: '.glass',
            scale: [0.9, 1],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutQuart'
        })
        .add({
            targets: '.hero-title',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 600,
            easing: 'easeOutQuart'
        }, '-=400');
    
    // Animate floating balls
    anime({
        targets: '.floating-ball',
        translateY: [-10, 10],
        rotate: [0, 360],
        duration: 4000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        delay: anime.stagger(1000)
    });
    
    // Animate leaderboard cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateY: [50, 0],
                    opacity: [0, 1],
                    duration: 600,
                    easing: 'easeOutQuart'
                });
            }
        });
    });
    
    document.querySelectorAll('.score-card').forEach(card => {
        observer.observe(card);
    });
}

// Utility Functions
function formatScore(score) {
    return score <= 0 ? `-${Math.abs(score)}` : `+${score}`;
}

function getScoreColor(score) {
    if (score <= 0) return 'text-green-600';
    if (score <= 5) return 'text-amber';
    return 'text-red-600';
}

// Resize chart on window resize
window.addEventListener('resize', () => {
    if (chart) {
        chart.resize();
    }
});

// Export functions for admin page
window.tournamentData = tournamentData;
window.renderLeaderboard = renderLeaderboard;
window.updateChart = updateChart;