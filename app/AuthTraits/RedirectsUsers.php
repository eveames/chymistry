<?php

namespace chymistry\AuthTraits;

trait RedirectsUsers
{
    /**
     * Get the post register / login redirect path.
     *
     * @return string
     */
    public function redirectPath()
    {
        if (property_exists($this, 'redirectPath')) {
            return $this->redirectPath;
        }
        //later, may put in check for user type here, and then redirect appropriately?
        return property_exists($this, 'redirectTo') ? $this->redirectTo : '/home';
    }
}