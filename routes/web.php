<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ThoughtController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Broadcast;
use App\Events\MessageNotification;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [ThoughtController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //index
    Route::get('/thoughts/home', [ThoughtController::class, 'index'])->name('thoughts.home');
    Route::get('/thoughts/category/{category}', [ThoughtController::class, 'sortByCategory'])->name('thoughts.sortByCategory');
    Route::get('/thoughts/users/{user}', [ThoughtController::class, 'viewUser'])->name('thoughts.viewUser');
    Route::match(['GET', 'POST'],'/thoughts/search/{search}', [ThoughtController::class, 'searchThought'])->name('thoughts.search');
    //Route::post('/thoughts/search/{search}', [ThoughtController::class, 'searchThought'])->name('thoughts.search');


    //see your notifications/invite
    Route::get('/thoughts/notifications', [ThoughtController::class, 'viewNotifications'])->name('thoughts.notification');
    //create and create post
    Route::get('/thoughts/create', [ThoughtController::class, 'createThought'])->name('thought.createThought');
    Route::post('/thoughts/store', [ThoughtController::class, 'storeThought'])->name('thought.storePost');

    //edit post
    Route::get('/thoughts/{thought}/edit', [ThoughtController::class, 'editThought'])->name('thought.editThought');
    Route::post('/thoughts/{thought}/save', [ThoughtController::class, 'saveChanges'])->name('thought.saveChanges');

    //delete post
    Route::get('/thoughts/{thought}/delete', [ThoughtController::class, 'deleteThought'])->name('thought.delete');

    //specific post
    Route::get('/thoughts/{id}', [ThoughtController::class, 'viewThought'])->name('thought.viewThought');

    //comment on thought
    Route::post('/thoughts/{thought}/comment', [ThoughtController::class, 'commentOnThought'])->name('thought.comment');
    //like thought
    Route::post('/thoughts/{id}/like', [ThoughtController::class, 'likeThought'])->name('thought.like');
    Route::post('/thoughts/{thought}/unlike', [ThoughtController::class, 'unlikeThought'])->name('thought.like');


    //test
    Route::get('/event', [ThoughtController::class, 'sendEvent'])->name('test.send');

    //send invite
    Route::post('/invite/{receiver}', [ThoughtController::class, 'sendInviteEvent'])->name('invite.send');
    Route::post('/invite/accept/{invite}', [ThoughtController::class, 'acceptInvite'])->name('invite.accept');
    Route::post('/invite/reject/{invite}', [ThoughtController::class, 'rejectInvite'])->name('invite.reject');
});

require __DIR__.'/auth.php';
