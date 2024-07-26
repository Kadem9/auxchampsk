<?php

namespace App\Controller\Admin;

use App\Entity\PortraitDuMois;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class PortraitDuMoisCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return PortraitDuMois::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('title')
            ->setLabel('Titre')
            ,
            TextEditorField::new('description'),
            ImageField::new('photo')
                ->setUploadDir('public/uploads/images')
                ->setBasePath('uploads/images')
            ->setUploadedFileNamePattern('[randomhash].[extension]')
        ];
    }
}
