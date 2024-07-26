<?php

namespace App\Controller\Admin;

use App\Entity\FruitDuMois;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use App\Controller\Admin\ProductsCrudController;

class FruitDuMoisCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return FruitDuMois::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('mois'),
            AssociationField::new('product')
            ->setCrudController(ProductsCrudController::class)
        ];
    }
}
