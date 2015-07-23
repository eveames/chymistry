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
            $table->unsignedInteger('user');
            $table->foreign('user')->references('id')->on('users');
            $table->unsignedInteger('type');
            $table->foreign('type')->references('id')->on('types');
            $table->string('subtype', 50);
            $table->string('qID', 100);
            $table->unsignedInteger('word')->nullable();
            $table->foreign('word')->references('id')->on('words');
            $table->unsignedInteger('lastStudied');
            $table->json('accuracyArray');
            $table->json('rtArray');
            $table->unsignedInteger('priority');
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
