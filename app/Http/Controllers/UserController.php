<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

use App\Models\User;

ini_set('memory_limit', '512M');

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('Users/List', [
            'users' => $users
        ]);
    }

    public function trashed()
    {
        $users = User::onlyTrashed()->get();
        return Inertia::render('Users/Trashed', [
            'users' => $users
        ]);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('Users/Show', [
            'user' => $user
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'prefixname' => ['nullable', 'in:Mr,Ms,Mrs'],
            'firstname' => 'required|string|max:255',
            'middlename' => 'nullable|string|max:255',
            'lastname' => 'required|string|max:255',
            'suffixname' => 'nullable|string|max:255',
            'username' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'nullable|string|min:8|confirmed',
            'photo' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('uploads', 'public');
        }

        User::create([
            'prefixname' => $validatedData['prefixname'],
            'firstname' => $validatedData['firstname'],
            'middlename' => $validatedData['middlename'],
            'lastname' => $validatedData['lastname'],
            'suffixname' => $validatedData['suffixname'],
            'username' => $validatedData['username'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'photo' => $photoPath ?? null,
        ]);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('Users/Show', [
            'user' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        try {
            $validatedData = $request->validate([
                'prefixname' => ['nullable', 'in:Mr,Ms,Mrs'],
                'firstname' => 'required|string|max:255',
                'middlename' => 'nullable|string|max:255',
                'lastname' => 'required|string|max:255',
                'suffixname' => 'nullable|string|max:255',
                'username' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:users,email,' . $user->id,
                'password' => 'nullable|string|min:8|confirmed',
            ]);

            $user->prefixname = $validatedData['prefixname'];
            $user->firstname = $validatedData['firstname'];
            $user->middlename = $validatedData['middlename'];
            $user->lastname = $validatedData['lastname'];
            $user->suffixname = $validatedData['suffixname'];
            $user->username = $validatedData['username'];
            $user->email = $validatedData['email'];

            if (!empty($validatedData['password'])) {
                $user->password = Hash::make($validatedData['password']);
            }

            $user->update($validatedData);
            return redirect()->back()->with('success', 'User updated successfully.');
        } catch (\Exception $e) {
            //return redirect()->back()->with('error', $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update user.');
        }

        // try {
        //     $user->save();
        //     return redirect()->back()->with('success', 'User updated successfully.');
        // } catch (\Exception $e) {
        //     return redirect()->back()->with('error', $e->getMessage());
        // }
    }

    public function destroy($id) {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User (soft) deleted successfully.');
    }

    public function restore($id) {
        $user = User::withTrashed()->findOrFail($id);
        $user->restore();

        return redirect()->route('users.index')->with('success', 'User restored successfully.');
    }

    public function delete($id) {
        $user = User::withTrashed()->findOrFail($id);
        $user->forceDelete();

        return redirect()->route('users.trashed')->with('success', 'User deleted permanently.');
    }

    public function test() {
        $user = User::find(1);
        $data = [
            'avatar' => $user->avatar,
            'fullname' => $user->fullname,
            'midinitial' => $user->middleinitial
        ];

        return $data;
    }
}
