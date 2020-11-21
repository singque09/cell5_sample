<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Game;
use Illuminate\Http\Request;
use Validator;
use App\Http\Resources\Games as GamesResource;

class GamesController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $games = Game::all();

        return $this->sendResponse(GamesResource::collection($games), 'Games retrieved successfully.');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'publisher' => 'required',
            'rent_date' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $games = Game::create($input);

        return $this->sendResponse(new GamesResource($games), 'Game created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $games = Game::find($id);

        if (is_null($games)) {
            return $this->sendError('Game not found.');
        }

        return $this->sendResponse(new GamesResource($games), 'Game retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $games = Game::find($id);

        if (is_null($games)) {
            return $this->sendError('Game not found.');
        }

        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'publisher' => 'required',
            'rent_date' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $updated = $games->fill($request->all())->save();

        if (!$updated) {
            return $this->sendError('Game can not be updated.');
        }
        return $this->sendResponse(new GamesResource($games), 'Game updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $games = Game::find($id);

        if (is_null($games)) {
            return $this->sendError('Game not found.');
        }

        $games->delete();

        return $this->sendResponse([], 'Game deleted successfully.');
    }
}
