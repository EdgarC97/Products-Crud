﻿using System;
using System.Collections.Generic;

namespace ProductsCrud.Models;

public partial class EfmigrationsHistory
{
    public string MigrationId { get; set; }

    public string ProductVersion { get; set; }
}
