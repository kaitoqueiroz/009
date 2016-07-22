<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lancamento extends Model
{
    protected $fillable = ['tipo','observacao','valor','data','distribuidor_id'];
    
    public function distribuidor()
    {
        return $this->belongsTo('App\Distribuidor', 'distribuidor_id');
    }
}
