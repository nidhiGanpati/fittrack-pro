/* ============================================
   FitTrack Pro - Nutrition & Exercise Module
   ============================================ */

const NutritionData = {
    foodLog: [],
    videosWatched: [],
    calorieTarget: 2000,
    caloriesConsumed: 0,
    caloriesBurned: 0,
    currentVideo: null
};

document.addEventListener('DOMContentLoaded', function() {
    if (!FitTrackApp.user) {
        window.location.href = 'index.html';
        return;
    }
    
    loadNutritionData();
    updateCalorieSummary();
    updateVideoStats();
    displayFoodLog();
    
    // Add Food Form
    document.getElementById('addFoodForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addFood();
    });
    
    console.log('🍎 Nutrition Module Initialized');
});

// ===== LOAD/SAVE DATA =====
function loadNutritionData() {
    const saved = Storage.get('fittrack_nutrition_' + FitTrackApp.user.id);
    if (saved) {
        const today = new Date().toDateString();
        if (saved.date === today) {
            NutritionData.foodLog = saved.foodLog || [];
            NutritionData.videosWatched = saved.videosWatched || [];
            NutritionData.calorieTarget = saved.calorieTarget || 2000;
            calculateTotals();
        }
    }
}

function saveNutritionData() {
    Storage.set('fittrack_nutrition_' + FitTrackApp.user.id, {
        date: new Date().toDateString(),
        foodLog: NutritionData.foodLog,
        videosWatched: NutritionData.videosWatched,
        calorieTarget: NutritionData.calorieTarget
    });
}

function calculateTotals() {
    NutritionData.caloriesConsumed = NutritionData.foodLog.reduce((sum, item) => sum + item.calories, 0);
    NutritionData.caloriesBurned = NutritionData.videosWatched.reduce((sum, item) => sum + item.calories, 0);
}

// ===== FOOD TRACKING =====
function addFood() {
    const name = document.getElementById('foodName').value.trim();
    const grams = parseInt(document.getElementById('foodGrams').value);
    const calories = parseInt(document.getElementById('foodCalories').value);
    
    if (!name || !grams || !calories) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    const foodItem = {
        id: Date.now(),
        name: name,
        grams: grams,
        calories: calories,
        time: new Date().toLocaleTimeString()
    };
    
    NutritionData.foodLog.push(foodItem);
    calculateTotals();
    saveNutritionData();
    
    document.getElementById('addFoodForm').reset();
    displayFoodLog();
    updateCalorieSummary();
    
    showNotification(`Added ${name} - ${calories} calories`, 'success');
}

function quickAddFood(name, grams, calories) {
    const foodItem = {
        id: Date.now(),
        name: name,
        grams: grams,
        calories: calories,
        time: new Date().toLocaleTimeString()
    };
    
    NutritionData.foodLog.push(foodItem);
    calculateTotals();
    saveNutritionData();
    
    displayFoodLog();
    updateCalorieSummary();
    
    showNotification(`Added ${name} - ${calories} calories`, 'success');
}

function removeFood(id) {
    NutritionData.foodLog = NutritionData.foodLog.filter(item => item.id !== id);
    calculateTotals();
    saveNutritionData();
    
    displayFoodLog();
    updateCalorieSummary();
    
    showNotification('Food item removed', 'success');
}

function clearFoodLog() {
    if (confirm('Clear all food items for today?')) {
        NutritionData.foodLog = [];
        calculateTotals();
        saveNutritionData();
        
        displayFoodLog();
        updateCalorieSummary();
        
        showNotification('Food log cleared', 'success');
    }
}

function displayFoodLog() {
    const container = document.getElementById('foodLog');
    if (!container) return;
    
    if (NutritionData.foodLog.length === 0) {
        container.innerHTML = '<p class="text-center text-muted py-4">No food items logged yet. Start tracking!</p>';
        return;
    }
    
    let html = '';
    NutritionData.foodLog.forEach(item => {
        html += `
            <div class="food-item">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1">${item.name}</h6>
                        <small class="text-muted">${item.grams}g • Added at ${item.time}</small>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="badge bg-success me-2 fs-6">${item.calories} cal</span>
                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeFood(${item.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function updateCalorieSummary() {
    document.getElementById('caloriesConsumed').textContent = NutritionData.caloriesConsumed;
    document.getElementById('calorieTarget').textContent = NutritionData.calorieTarget;
    document.getElementById('caloriesBurnedDisplay').textContent = NutritionData.caloriesBurned;
    
    const netCalories = NutritionData.caloriesConsumed - NutritionData.caloriesBurned;
    document.getElementById('netCalories').textContent = netCalories;
    
    const percentage = (NutritionData.caloriesConsumed / NutritionData.calorieTarget) * 100;
    document.getElementById('calorieProgress').style.width = Math.min(percentage, 100) + '%';
    
    const statusEl = document.getElementById('calorieStatus');
    if (netCalories < NutritionData.calorieTarget - 500) {
        statusEl.textContent = 'Deficit - Good for weight loss';
        statusEl.style.color = 'var(--success)';
    } else if (netCalories > NutritionData.calorieTarget + 500) {
        statusEl.textContent = 'Surplus - Good for muscle gain';
        statusEl.style.color = 'var(--warning)';
    } else {
        statusEl.textContent = 'Balanced - Maintaining weight';
        statusEl.style.color = 'var(--info)';
    }
}

// ===== VIDEO TRACKING =====
function filterVideos(category) {
    const videos = document.querySelectorAll('.video-item');
    const buttons = document.querySelectorAll('.btn-group .btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    videos.forEach(video => {
        if (category === 'all' || video.dataset.category === category) {
            video.style.display = 'block';
        } else {
            video.style.display = 'none';
        }
    });
}

function playVideo(url, title, calories) {
    NutritionData.currentVideo = { url, title, calories };
    
    document.getElementById('videoTitle').textContent = title;
    document.getElementById('videoPlayer').src = url + '?autoplay=1';
    document.getElementById('videoCalories').textContent = calories;
    
    const modal = new bootstrap.Modal(document.getElementById('videoModal'));
    modal.show();
}

function markVideoComplete() {
    if (!NutritionData.currentVideo) return;
    
    const videoLog = {
        id: Date.now(),
        title: NutritionData.currentVideo.title,
        calories: NutritionData.currentVideo.calories,
        time: new Date().toLocaleTimeString()
    };
    
    NutritionData.videosWatched.push(videoLog);
    calculateTotals();
    saveNutritionData();
    
    updateCalorieSummary();
    updateVideoStats();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('videoModal'));
    modal.hide();
    
    document.getElementById('videoPlayer').src = '';
    
    showNotification(`Great job! +${NutritionData.currentVideo.calories} calories burned! 🔥`, 'success');
}

function updateVideoStats() {
    document.getElementById('videosWatched').textContent = NutritionData.videosWatched.length;
    document.getElementById('caloriesBurnedToday').textContent = NutritionData.caloriesBurned;
    
    const totalMinutes = NutritionData.videosWatched.length * 15;
    document.getElementById('minutesToday').textContent = totalMinutes;
}

// ===== DIET PLAN GENERATOR =====
function generateDietPlan(goal) {
    let plan = {};
    
    if (goal === 'lose') {
        plan = {
            goal: 'Lose Weight',
            targetCalories: 1500,
            protein: 120,
            carbs: 150,
            fats: 50,
            meals: [
                {
                    time: 'Breakfast (7:00 AM)',
                    items: [
                        '2 Eggs (156 cal)',
                        '2 Slices Whole Wheat Bread (160 cal)',
                        '1 Banana (105 cal)',
                        'Black Coffee (5 cal)'
                    ],
                    total: 426
                },
                {
                    time: 'Mid-Morning Snack (10:00 AM)',
                    items: [
                        '1 Apple (95 cal)',
                        '10 Almonds (70 cal)'
                    ],
                    total: 165
                },
                {
                    time: 'Lunch (1:00 PM)',
                    items: [
                        'Grilled Chicken Breast 150g (248 cal)',
                        'Brown Rice 100g (112 cal)',
                        'Mixed Vegetables 200g (80 cal)',
                        'Olive Oil 1 tbsp (120 cal)'
                    ],
                    total: 560
                },
                {
                    time: 'Evening Snack (4:00 PM)',
                    items: [
                        'Greek Yogurt 150g (150 cal)',
                        'Berries 50g (25 cal)'
                    ],
                    total: 175
                },
                {
                    time: 'Dinner (7:00 PM)',
                    items: [
                        'Grilled Fish 150g (180 cal)',
                        'Quinoa 80g (120 cal)',
                        'Steamed Broccoli 150g (50 cal)',
                        'Green Salad (30 cal)'
                    ],
                    total: 380
                }
            ],
            tips: [
                'Drink 8-10 glasses of water daily',
                'Avoid sugary drinks and processed foods',
                'Exercise 4-5 times per week',
                'Get 7-8 hours of sleep',
                'Track your progress daily'
            ]
        };
    } else if (goal === 'maintain') {
        plan = {
            goal: 'Maintain Weight',
            targetCalories: 2000,
            protein: 150,
            carbs: 200,
            fats: 70,
            meals: [
                {
                    time: 'Breakfast (7:00 AM)',
                    items: [
                        '3 Eggs (234 cal)',
                        '2 Slices Whole Wheat Toast (160 cal)',
                        'Avocado Half (120 cal)',
                        'Orange Juice 200ml (90 cal)'
                    ],
                    total: 604
                },
                {
                    time: 'Mid-Morning Snack (10:00 AM)',
                    items: [
                        'Protein Shake (200 cal)',
                        '1 Banana (105 cal)'
                    ],
                    total: 305
                },
                {
                    time: 'Lunch (1:00 PM)',
                    items: [
                        'Grilled Chicken 200g (330 cal)',
                        'Brown Rice 150g (168 cal)',
                        'Mixed Vegetables 200g (80 cal)',
                        'Olive Oil 1 tbsp (120 cal)'
                    ],
                    total: 698
                },
                {
                    time: 'Evening Snack (4:00 PM)',
                    items: [
                        'Handful of Nuts (180 cal)',
                        '1 Apple (95 cal)'
                    ],
                    total: 275
                },
                {
                    time: 'Dinner (7:00 PM)',
                    items: [
                        'Lean Beef 150g (250 cal)',
                        'Sweet Potato 200g (180 cal)',
                        'Green Salad with Dressing (100 cal)'
                    ],
                    total: 530
                }
            ],
            tips: [
                'Balance protein, carbs, and fats',
                'Eat regular meals throughout the day',
                'Stay hydrated',
                'Exercise 3-4 times per week',
                'Monitor your weight weekly'
            ]
        };
    } else if (goal === 'gain') {
        plan = {
            goal: 'Gain Weight (Muscle)',
            targetCalories: 2800,
            protein: 200,
            carbs: 300,
            fats: 90,
            meals: [
                {
                    time: 'Breakfast (7:00 AM)',
                    items: [
                        '4 Eggs (312 cal)',
                        '3 Slices Whole Wheat Toast (240 cal)',
                        'Peanut Butter 2 tbsp (190 cal)',
                        'Milk 300ml (183 cal)'
                    ],
                    total: 925
                },
                {
                    time: 'Mid-Morning Snack (10:00 AM)',
                    items: [
                        'Mass Gainer Shake (400 cal)',
                        '2 Bananas (210 cal)'
                    ],
                    total: 610
                },
                {
                    time: 'Lunch (1:00 PM)',
                    items: [
                        'Grilled Chicken 250g (413 cal)',
                        'White Rice 200g (260 cal)',
                        'Mixed Vegetables 200g (80 cal)',
                        'Olive Oil 2 tbsp (240 cal)'
                    ],
                    total: 993
                },
                {
                    time: 'Post-Workout (4:00 PM)',
                    items: [
                        'Protein Shake (250 cal)',
                        'Energy Bar (200 cal)',
                        '2 Bananas (210 cal)'
                    ],
                    total: 660
                },
                {
                    time: 'Dinner (7:00 PM)',
                    items: [
                        'Salmon 200g (400 cal)',
                        'Pasta 150g (240 cal)',
                        'Cheese 50g (200 cal)',
                        'Green Salad (50 cal)'
                    ],
                    total: 890
                },
                {
                    time: 'Before Bed (10:00 PM)',
                    items: [
                        'Cottage Cheese 200g (200 cal)',
                        'Nuts 30g (180 cal)'
                    ],
                    total: 380
                }
            ],
            tips: [
                'Eat every 2-3 hours',
                'Focus on protein-rich foods',
                'Lift weights 4-5 times per week',
                'Get adequate rest and recovery',
                'Track calories consistently',
                'Increase portions gradually'
            ]
        };
    }
    
    displayDietPlan(plan);
}

function displayDietPlan(plan) {
    const container = document.getElementById('dietPlanContainer');
    
    const totalCalories = plan.meals.reduce((sum, meal) => sum + meal.total, 0);
    
    let mealsHtml = '';
    plan.meals.forEach(meal => {
        mealsHtml += `
            <div class="mb-4">
                <div class="meal-time">${meal.time}</div>
                <ul class="list-unstyled ms-3">
                    ${meal.items.map(item => `<li class="mb-1"><i class="bi bi-check-circle-fill text-success me-2"></i>${item}</li>`).join('')}
                </ul>
                <p class="fw-bold text-primary">Total: ${meal.total} calories</p>
            </div>
        `;
    });
    
    let tipsHtml = '';
    plan.tips.forEach(tip => {
        tipsHtml += `<li class="mb-2"><i class="bi bi-star-fill text-warning me-2"></i>${tip}</li>`;
    });
    
    container.innerHTML = `
        <div class="diet-plan-card">
            <div class="text-center mb-4">
                <h3 class="gradient-text mb-3">${plan.goal} Plan</h3>
                <div class="row">
                    <div class="col-md-3">
                        <div class="text-center p-3 bg-light rounded-3">
                            <h4 class="text-primary mb-1">${plan.targetCalories}</h4>
                            <small class="text-muted">Daily Calories</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center p-3 bg-light rounded-3">
                            <h4 class="text-success mb-1">${plan.protein}g</h4>
                            <small class="text-muted">Protein</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center p-3 bg-light rounded-3">
                            <h4 class="text-warning mb-1">${plan.carbs}g</h4>
                            <small class="text-muted">Carbs</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center p-3 bg-light rounded-3">
                            <h4 class="text-info mb-1">${plan.fats}g</h4>
                            <small class="text-muted">Fats</small>
                        </div>
                    </div>
                </div>
            </div>
            
            <hr>
            
            <h5 class="mb-4"><i class="bi bi-calendar-week text-primary me-2"></i>Daily Meal Plan</h5>
            ${mealsHtml}
            
            <div class="alert alert-info">
                <strong><i class="bi bi-calculator me-2"></i>Total Daily Calories:</strong> ${totalCalories} cal
            </div>
            
            <hr>
            
            <h5 class="mb-3"><i class="bi bi-lightbulb text-warning me-2"></i>Success Tips</h5>
            <ul class="mb-4">
                ${tipsHtml}
            </ul>
            
            <div class="text-center">
                <button type="button" class="btn btn-gradient btn-lg" onclick="saveDietPlan('${plan.goal}', ${plan.targetCalories})">
                    <i class="bi bi-save me-2"></i>Save This Plan
                </button>
                <button type="button" class="btn btn-outline-primary btn-lg ms-2" onclick="printDietPlan()">
                    <i class="bi bi-printer me-2"></i>Print Plan
                </button>
            </div>
        </div>
    `;
}

function saveDietPlan(goal, targetCalories) {
    NutritionData.calorieTarget = targetCalories;
    Storage.set('fittrack_diet_plan_' + FitTrackApp.user.id, {
        goal: goal,
        targetCalories: targetCalories,
        savedDate: new Date().toISOString()
    });
    
    document.getElementById('calorieTarget').textContent = targetCalories;
    updateCalorieSummary();
    
    showNotification('Diet plan saved successfully! 🎉', 'success');
}

function printDietPlan() {
    window.print();
}

// ===== EXPORT FUNCTIONS =====
window.quickAddFood = quickAddFood;
window.removeFood = removeFood;
window.clearFoodLog = clearFoodLog;
window.filterVideos = filterVideos;
window.playVideo = playVideo;
window.markVideoComplete = markVideoComplete;
window.generateDietPlan = generateDietPlan;
window.saveDietPlan = saveDietPlan;
window.printDietPlan = printDietPlan;

console.log('🍎 Nutrition & Video Module Loaded');