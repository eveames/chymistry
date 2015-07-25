<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('states', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedInteger('type_id');
            $table->foreign('type_id')->references('id')->on('types');
            $table->json('subtype');
            $table->string('qID', 100);
            $table->unsignedInteger('word_id')->nullable();
            $table->foreign('word_id')->references('id')->on('words');
            $table->bigInteger('lastStudied')->unsigned();
            $table->json('accuracyArray');
            $table->json('rtArray');
            $table->bigInteger('priority')->unsigned();
            $table->string('stage', 20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('states');
    }
}
